import { getQuest } from '@/app/(private)/_actions/get-quest';
import { Header } from '@/app/(private)/_components/header';
import { css } from '@/styled-system/css';
import { DeleteConfirmButton } from './_components/delete-confirm-button';
import { EditQuestButton } from './_components/edit-quest-button';
import { ExecuteButton } from './_components/execute-button';

const Page = async (props: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { id: questId } = await props.params;
  const quest = await getQuest(questId);

  if (quest.type === 'error') {
    throw new Error(quest.error.message);
  }

  return (
    <main
      className={css({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: '16px',
        height: '[100%]',
      })}
    >
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        })}
      >
        <Header
          rightSlot={
            <div className={css({ display: 'flex', gap: '8px' })}>
              <EditQuestButton
                id={quest.data.id}
                name={quest.data.title}
                description={quest.data.description}
              />
              <DeleteConfirmButton id={quest.data.id} name={quest.data.title} />
            </div>
          }
        />
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            px: '12px',
          })}
        >
          <h1 className={css({ textStyle: 'Body.primary' })}>
            {quest.data.title}
          </h1>
          {quest.data.description && (
            <p
              className={css({
                textStyle: 'Body.tertiary',
                color: 'foreground',
                whiteSpace: 'pre-wrap',
              })}
            >
              {quest.data.description}
            </p>
          )}
        </div>
      </div>
      <div
        className={css({
          width: '[100%]',
          display: 'flex',
          justifyContent: 'center',
          py: '24px',
        })}
      >
        <ExecuteButton questId={questId} />
      </div>
    </main>
  );
};

export default Page;
