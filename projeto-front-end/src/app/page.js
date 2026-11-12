import Image from "next/image";
import styles from "./page.module.css";
import { Link } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";

export default function Home() {
  return (
  <>
    <NavBar/>
    <h1 className="display-1">APP 4º ADS - FATEC Guaratinguetá... Olá mundo!!!</h1>
    
  </>
  );
}
