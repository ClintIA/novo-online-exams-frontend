import styles from './Post.module.css';
import { Avatar } from './Avatar';
import { format } from 'date-fns';
import {ptBR} from 'date-fns/locale/pt-BR';
import {  useState } from 'react';
import { Share } from 'phosphor-react';
import * as Dialog from "@radix-ui/react-dialog";
import { ModalDetail } from './ModalDetail';


export interface Exame {
  id: string;
  nome: string;
  avatarUrl: string;
  consultorio: string;
  data: Date;
  horario: string;
  resultado: string;
  resumo: string;
  tipo: string;
}


interface PostProps {
  post: Exame;
}

export function Post({ post }: PostProps) {

  const [selectedExame, setSelectedExame] = useState<Exame | null>(null);

  const publishedDateFormatted = format(post.data, "dd/MM/yyyy HH:mm", {
    locale: ptBR,
  });

  // const publishedDateRelativeToNow = formatDistanceToNow(post.data, {
  //   locale: ptBR,
  //   addSuffix: true
  // });

  const handleOpenModal = () => {
    setSelectedExame(post); // Aqui, passamos o exame atual para o modal
  };


  return (
    <>

      <article className={styles.post}>

        
        <header>
          <div className={styles.author}>
            <Avatar src={post.avatarUrl}/>
            <div className={styles.authorInfo}>
              <strong>{post.nome}</strong>
              <span>{post.tipo}</span>
              <span>{publishedDateFormatted}</span>
            </div>
          </div>

          <div>
            {/* <time title={publishedDateFormatted} dateTime={post.data.toISOString()}>
              {publishedDateFormatted}
            </time> */}
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <button onClick={handleOpenModal}>
                    <Share size={24} />
                </button>
              </Dialog.Trigger>
              {selectedExame && <ModalDetail exame={selectedExame} />}

            </Dialog.Root>
          </div>

        </header>

      </article>
    </>
  )
}