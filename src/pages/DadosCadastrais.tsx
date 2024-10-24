import { Header } from "../components/Header";
import { PersonalInfoTable } from "../components/PersonalInfoTable";
import styles from './DadosCadastrais.module.css';


export function DadosCadastrais(){

    return(
        <div>
        <Header />
        
  
        <div className={styles.wrapper}>
        
          <main>
            <div>
              <h1 className={styles.title}>Dados Cadastrais</h1>
            </div>
                <PersonalInfoTable/>

          </main>
        </div>
      </div>

)}