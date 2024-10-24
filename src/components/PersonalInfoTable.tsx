import { NotePencil } from 'phosphor-react';
import styles from './PersonalInfoTable.module.css';
import { useState } from 'react';
import { ModalEditDados } from './ModalEditDados';

type PersonalInfo = {
  label: string;
  value: string;
  editable: boolean; 
};

const personalInfoData: PersonalInfo[] = [
  { label: 'Nome Legal', value: 'Joao Marcelo Bejarano', editable: true },
  { label: 'Nome Social', value: '', editable: true },
  { label: 'CPF', value: '057.840.867-82', editable: false }, 
  { label: 'RG', value: '', editable: true },
  { label: 'CNH', value: '', editable: false }, 
  { label: 'Data De Nascimento', value: '10/04/1995 - 29 anos', editable: false }, 
  { label: 'Sexo Biológico', value: 'Masculino', editable: true },
  { label: 'Identidade De Gênero', value: '', editable: true },
  { label: 'Nacionalidade', value: '', editable: true },
  { label: 'Estado Civil', value: '', editable: true },
  { label: 'Profissão', value: '', editable: true },
];

export function PersonalInfoTable() {
  const [selectedInfo, setSelectedInfo] = useState<PersonalInfo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (info: PersonalInfo) => {
    setSelectedInfo(info);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedInfo(null);
    setIsModalOpen(false);
  };

  return (
    <div className={styles.container}>
      {personalInfoData.map((info, index) => (
        <div key={index} className={styles.row}>
          <div className={styles.label}>{info.label}</div>
          <div className={styles.value}>
            {info.value || '---'}
          </div>
          <div>
            {/* Só exibe o botão de edição se o campo for editável */}
            {info.editable ? (
              <button onClick={() => handleOpenModal(info)}>
                <NotePencil size={20} className={styles.icon} />
              </button>
            ) : (
              <button disabled={true} onClick={() => handleOpenModal(info)}>
                <NotePencil size={20} className={styles.iconplaceholder} />
              </button> // Placeholder para manter alinhamento
            )}
          </div>
        </div>
      ))}

      {selectedInfo && (
        <ModalEditDados 
          info={selectedInfo} 
          isOpen={isModalOpen} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
};
