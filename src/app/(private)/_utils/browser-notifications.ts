'use client';

export interface NotificationOptions {
  title: string;
  body: string;
  icon?: string;
  tag?: string;
  requireInteraction?: boolean;
}

/**
 * ブラウザ通知の権限状態を取得
 */
export function getNotificationPermission(): NotificationPermission {
  if (!('Notification' in window)) {
    return 'denied';
  }
  return Notification.permission;
}

/**
 * ブラウザ通知の権限をリクエスト
 */
export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (!('Notification' in window)) {
    console.warn('このブラウザは通知をサポートしていません');
    return 'denied';
  }

  if (Notification.permission === 'granted') {
    return 'granted';
  }

  try {
    const permission = await Notification.requestPermission();
    return permission;
  } catch (error) {
    console.error('通知権限の取得に失敗しました:', error);
    return 'denied';
  }
}

/**
 * ブラウザ通知を表示
 */
export function showNotification(
  options: NotificationOptions,
): Notification | null {
  if (!('Notification' in window)) {
    console.warn('このブラウザは通知をサポートしていません');
    return null;
  }

  if (Notification.permission !== 'granted') {
    console.warn('通知の権限が許可されていません');
    return null;
  }

  try {
    const notification = new Notification(options.title, {
      body: options.body,
      icon: options.icon || '/icon.png',
      tag: options.tag || 'superbetter-notification',
      requireInteraction: options.requireInteraction || false,
    });

    // 5秒後に自動で閉じる（requireInteractionがfalseの場合）
    if (!options.requireInteraction) {
      setTimeout(() => {
        notification.close();
      }, 5000);
    }

    return notification;
  } catch (error) {
    console.error('通知の表示に失敗しました:', error);
    return null;
  }
}

/**
 * デイリーミッション通知を表示
 */
export function showDailyMissionNotification(
  message: string,
): Notification | null {
  return showNotification({
    title: 'SuperBetter - デイリーミッション',
    body: message,
    icon: '/icon.png',
    tag: 'daily-mission-reminder',
    requireInteraction: false,
  });
}

/**
 * 達成通知を表示
 */
export function showAchievementNotification(
  message: string,
): Notification | null {
  return showNotification({
    title: 'SuperBetter - 達成おめでとうございます！',
    body: message,
    icon: '/icon.png',
    tag: 'achievement-unlock',
    requireInteraction: true,
  });
}

/**
 * 通知がサポートされているかチェック
 */
export function isNotificationSupported(): boolean {
  return 'Notification' in window;
}

/**
 * Service Worker通知がサポートされているかチェック
 */
export function isServiceWorkerNotificationSupported(): boolean {
  return (
    'serviceWorker' in navigator &&
    'Notification' in window &&
    'PushManager' in window
  );
}

/**
 * Push通知のサブスクリプションを取得
 */
export async function getPushSubscription(): Promise<PushSubscription | null> {
  if (!isServiceWorkerNotificationSupported()) {
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();
    return subscription;
  } catch (error) {
    console.error('Push通知サブスクリプションの取得に失敗しました:', error);
    return null;
  }
}

/**
 * Push通知をサブスクライブ
 */
export async function subscribeToPushNotifications(
  vapidPublicKey: string,
): Promise<PushSubscription | null> {
  if (!isServiceWorkerNotificationSupported()) {
    console.warn('Push通知はサポートされていません');
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.ready;

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: vapidPublicKey,
    });

    return subscription;
  } catch (error) {
    console.error('Push通知のサブスクライブに失敗しました:', error);
    return null;
  }
}

/**
 * Push通知をアンサブスクライブ
 */
export async function unsubscribeFromPushNotifications(): Promise<boolean> {
  if (!isServiceWorkerNotificationSupported()) {
    return false;
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();

    if (subscription) {
      const result = await subscription.unsubscribe();
      return result;
    }

    return true;
  } catch (error) {
    console.error('Push通知のアンサブスクライブに失敗しました:', error);
    return false;
  }
}
