import { Header } from "../components/Header";
import '../global.css';
import styles from './Exames.module.css';
import { Post, Exame } from '../components/Post';
import { ConsultorioDropdown } from '../components/ConsultorioDropdown';
import { useState } from 'react';
import logoExam from '../assets/icon-clintia.png';
import logoConsultas from '../assets/icon-clintia.png';

const mockExames: Exame[] = [
  {
    id: "1",
    nome: "Hemograma Completo",
    avatarUrl: logoConsultas,
    consultorio: "Laboratório A",
    data: new Date('2022-05-10 20:00:00'),
    horario: "07:57",
    resultado: "Normal",
    resumo: "Resumo do exame Hemograma Completo",
    tipo: "Consulta"
  },
  {
    id: "2",
    nome: "Glicose",
    avatarUrl: logoExam,
    consultorio: "Laboratório B",
    data: new Date('2022-05-10 20:00:00'),
    horario: "09:55",
    resultado: "Elevado",
    resumo: "Resumo do exame Glicose",
    tipo: "Exames Laboratoriais"
  },
];

export function Exames() {
  const [filteredExames, setFilteredExames] = useState<Exame[]>(mockExames);

  const handleSelectConsultorio = (consultorio: string) => {
    if (consultorio === "Todos") {
      setFilteredExames(mockExames);
    } else {
      const filtered = mockExames.filter(exame => exame.consultorio === consultorio);
      setFilteredExames(filtered);
    }
  };

  const consultorios = Array.from(new Set(mockExames.map(exame => exame.consultorio)));

  return (
    <div>
      <div className={styles.wrapper}>
        <Header />
        <main>
          <div>
            <h1 className={styles.title}>Resultado de Exames</h1>
            <ConsultorioDropdown consultorios={consultorios} onSelectConsultorio={handleSelectConsultorio} />
          </div>

          {filteredExames.map(exame => (
            <Post
              key={exame.id}
              post={exame}
            />
          ))}
        </main>
      </div>
    </div>
  );
}
