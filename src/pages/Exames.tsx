import { Header } from "../components/Header";
import '../global.css';
import styles from './Exames.module.css';
import { Post, Exame } from '../components/Post';
import { ConsultorioDropdown } from '../components/ConsultorioDropdown';
import { useState, useEffect } from 'react';
import logoExam from '../assets/icon-clintia.png';
import { getPatientExams } from '../api/patient-exams';
import { useAuth } from '../components/hooks/auth';


interface Exam {
  id: number;
  exam_name: string;
}

interface PatientExam {
  id: number;
  link: string | null;
  createdAt: string;
  examDate: string;
  uploadedAt: string | null;
  status: string;
  exam: Exam;
}

interface Tenant {
  id: number;
  name: string;
  patientExams: PatientExam[];
}

export function Exames() {
  const [exames, setExames] = useState<Exame[]>([]);
  const [filteredExames, setFilteredExames] = useState<Exame[]>([]);
  const { userId } = useAuth();
  

  console.log(userId)


  useEffect(() => {
  
    async function fetchExames() {
      try {
        const response = await getPatientExams(Number(userId));

        // console.log(response)
        // console.log(response.data)

        if (!response.data || !response.data.exames) {
          console.log("Sem exames cadastrados");
          setExames([]);
          setFilteredExames([]);
          return;
        }

        const apiExames: Exame[] = response.data.exames.flatMap((tenant: Tenant) =>
          tenant.patientExams.map((exam: PatientExam) => ({
            id: exam.id.toString(),
            nome: exam.exam.exam_name,
            avatarUrl: logoExam,
            link: exam.link,
            consultorio: tenant.name,
            data: new Date(exam.examDate),
            horario: new Date(exam.examDate).toLocaleTimeString(),
            resultado: exam.status,
            resumo: `Resumo do exame ${exam.exam.exam_name}`,
            tipo: "Exames Laboratoriais",
          }))
        );

        setExames(apiExames);
        setFilteredExames(apiExames);
      } catch (error) {
        console.error("Erro ao buscar exames:", error);
      }
    }

    fetchExames();
  }, [userId]);

  const handleSelectConsultorio = (consultorio: string) => {
    if (consultorio === "Todos") {
      setFilteredExames(exames);
    } else {
      const filtered = exames.filter(exame => exame.consultorio === consultorio);
      setFilteredExames(filtered);
    }
  };

  const consultorios = Array.from(new Set(exames.map(exame => exame.consultorio)));

  return (
    <div>
      <div className={styles.wrapper}>
        <Header />
        <main>
          <div>
            <h1 className={styles.title}>Resultado de Exames</h1>
            <ConsultorioDropdown consultorios={consultorios} onSelectConsultorio={handleSelectConsultorio} />
          </div>

          {filteredExames.length === 0 ? (
          <p className={styles.noExamsMessage}>Sem exames cadastrados</p>
        ) : (
          filteredExames.map(exame => (
            <Post
              key={exame.id}
              post={exame}
            />
            
          ))
        )}
        </main>
      </div>
    </div>
  );
}
