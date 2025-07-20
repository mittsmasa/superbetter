'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/button';
import { css, cx } from '@/styled-system/css';
import { pixelBorder } from '@/styled-system/patterns';
import {
  requestNotificationPermission,
  getNotificationPermission,
  showDailyMissionNotification,
  isNotificationSupported,
} from '../../_utils/browser-notifications';
import { updateNotificationSettings } from '../../_actions/update-notification-settings';

interface NotificationSettingsProps {
  initialSettings: {
    dailyMissionReminder: boolean;
    reminderTime: string;
    enablePushNotifications: boolean;
  };
}

const Checkbox = ({
  label,
  checked,
  onChange,
  disabled = false,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}) => {
  return (
    <label
      className={css({
        backgroundColor: 'interactive.background',
        display: 'flex',
        alignItems: 'center',
        width: '[100%]',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
      })}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        className={cx(
          'peer',
          css({ opacity: 0, width: '[0px]', height: '[0px]' }),
        )}
      />
      <span
        className={css({
          textStyle: 'Body.secondary',
          display: 'flex',
          alignItems: 'center',
          width: '[100%]',
          padding: '8px',
          gap: '8px',
          _peerChecked: {
            backgroundColor: 'foreground',
            color: 'background',
          },
        })}
      >
        <span
          className={css({
            width: '16px',
            height: '16px',
            backgroundColor: checked ? 'background' : 'transparent',
            border: '2px solid',
            borderColor: checked ? 'background' : 'foreground',
          })}
        />
        {label}
      </span>
    </label>
  );
};

const TimeInput = ({
  label,
  value,
  onChange,
  disabled = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}) => {
  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
      })}
    >
      <label className={css({ textStyle: 'Body.tertiary' })}>
        {label}
      </label>
      <input
        type="time"
        value={value.slice(0, 5)} // HH:MM:SS → HH:MM
        onChange={(e) => onChange(`${e.target.value}:00`)} // HH:MM → HH:MM:SS
        disabled={disabled}
        className={cx(
          pixelBorder({ borderWidth: 2, borderColor: 'interactive.border' }),
          css({ 
            padding: '4px', 
            textStyle: 'Body.primary',
            opacity: disabled ? 0.6 : 1,
            cursor: disabled ? 'not-allowed' : 'auto',
          }),
        )}
      />
    </div>
  );
};

export const NotificationSettings = ({ initialSettings }: NotificationSettingsProps) => {
  const [settings, setSettings] = useState(initialSettings);
  const [browserPermission, setBrowserPermission] = useState<NotificationPermission>('default');
  const [isLoading, setIsLoading] = useState(false);
  const [isNotificationSupportedByBrowser, setIsNotificationSupportedByBrowser] = useState(false);

  useEffect(() => {
    setIsNotificationSupportedByBrowser(isNotificationSupported());
    if (isNotificationSupported()) {
      setBrowserPermission(getNotificationPermission());
    }
  }, []);

  const handleSettingsChange = async (newSettings: Partial<typeof settings>) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    
    try {
      setIsLoading(true);
      await updateNotificationSettings(updatedSettings);
    } catch (error) {
      console.error('設定の更新に失敗しました:', error);
      // エラー時は元の設定に戻す
      setSettings(settings);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRequestPermission = async () => {
    if (!isNotificationSupportedByBrowser) {
      alert('このブラウザは通知機能をサポートしていません。');
      return;
    }

    try {
      setIsLoading(true);
      const permission = await requestNotificationPermission();
      setBrowserPermission(permission);
      
      if (permission === 'granted') {
        // 権限が許可されたら設定を有効にする
        await handleSettingsChange({ enablePushNotifications: true });
      }
    } catch (error) {
      console.error('通知権限の取得に失敗しました:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestNotification = () => {
    if (browserPermission === 'granted') {
      showDailyMissionNotification('これはテスト通知です。通知機能が正常に動作しています！');
    } else {
      alert('まず通知の権限を許可してください。');
    }
  };

  const getPermissionStatusText = () => {
    switch (browserPermission) {
      case 'granted':
        return '許可済み';
      case 'denied':
        return '拒否されています';
      default:
        return '未設定';
    }
  };

  const getPermissionStatusColor = () => {
    switch (browserPermission) {
      case 'granted':
        return 'green.500';
      case 'denied':
        return 'red.500';
      default:
        return 'yellow.500';
    }
  };

  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        padding: '16px',
      })}
    >
      <h2 className={css({ textStyle: 'Heading.primary' })}>
        通知設定
      </h2>

      {/* 基本設定 */}
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        })}
      >
        <h3 className={css({ textStyle: 'Heading.secondary' })}>
          デイリーミッション通知
        </h3>
        
        <Checkbox
          label="デイリーミッション未達成時に通知を受け取る"
          checked={settings.dailyMissionReminder}
          onChange={(checked) => handleSettingsChange({ dailyMissionReminder: checked })}
          disabled={isLoading}
        />

        {settings.dailyMissionReminder && (
          <TimeInput
            label="通知時間"
            value={settings.reminderTime}
            onChange={(value) => handleSettingsChange({ reminderTime: value })}
            disabled={isLoading}
          />
        )}
      </div>

      {/* ブラウザ通知設定 */}
      {isNotificationSupportedByBrowser && (
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          })}
        >
          <h3 className={css({ textStyle: 'Heading.secondary' })}>
            ブラウザ通知
          </h3>
          
          <div
            className={css({
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              flexWrap: 'wrap',
            })}
          >
            <span className={css({ textStyle: 'Body.secondary' })}>
              権限状態:
            </span>
            <span 
              className={css({ 
                textStyle: 'Body.primary',
                color: getPermissionStatusColor(),
                fontWeight: 'bold',
              })}
            >
              {getPermissionStatusText()}
            </span>
          </div>

          {browserPermission === 'default' && (
            <Button
              onClick={handleRequestPermission}
              disabled={isLoading}
              variant="primary"
            >
              通知を許可する
            </Button>
          )}

          {browserPermission === 'granted' && (
            <div
              className={css({
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              })}
            >
              <Checkbox
                label="ブラウザ通知を有効にする"
                checked={settings.enablePushNotifications}
                onChange={(checked) => handleSettingsChange({ enablePushNotifications: checked })}
                disabled={isLoading}
              />
              
              <Button
                onClick={handleTestNotification}
                variant="secondary"
                disabled={!settings.enablePushNotifications}
              >
                テスト通知を送信
              </Button>
            </div>
          )}

          {browserPermission === 'denied' && (
            <div
              className={css({
                padding: '8px',
                backgroundColor: 'red.100',
                border: '1px solid',
                borderColor: 'red.300',
                textStyle: 'Body.secondary',
              })}
            >
              通知が拒否されています。ブラウザの設定から通知を許可してください。
            </div>
          )}
        </div>
      )}

      {!isNotificationSupportedByBrowser && (
        <div
          className={css({
            padding: '8px',
            backgroundColor: 'yellow.100',
            border: '1px solid',
            borderColor: 'yellow.300',
            textStyle: 'Body.secondary',
          })}
        >
          このブラウザは通知機能をサポートしていません。
        </div>
      )}

      {isLoading && (
        <div
          className={css({
            textAlign: 'center',
            textStyle: 'Body.secondary',
            color: 'foreground.muted',
          })}
        >
          設定を更新中...
        </div>
      )}
    </div>
  );
};