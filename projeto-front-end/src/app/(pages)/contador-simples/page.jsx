import NavBar from "@/app/components/NavBar/NavBar";
import styles from "./contadorsimples.module.css";
import Contador from "@/app/components/contador/Contador";
import Titulo from "@/app/components/Titulo/Titulo";

export default function ContadorSimples() {
    return (
        <div>
            <NavBar />
            <div className="container mt-3">
                <Titulo titulo="Contador Simples" nivel={1} />
                <Contador />
            </div>

        </div>
    );
}