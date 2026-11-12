"use client"

import { useState } from "react";
import NavBar from "@/app/components/NavBar/NavBar";
import Titulo from "@/app/components/Titulo/Titulo";

export default function CadastrarUsuario() {

    const [autor, setAutor] = useState({
        nome: "",
        nacionalidade: "",
        dataNascimento: ""
    })

    const [salvando, setSalvando] = useState(false);

    const [mensagemSucesso, setMensagemSucesso] = useState("");
    const [erro, setErro] = useState("");

    function atualizarCampo(e) {
        const { name, value } = e.target;
        setAutor(
            (dadosAtuais) => ({
                ...dadosAtuais,
                [name]: value
            })
        )
    }

    return (
        <>
            <NavBar />
            <div className="container mt-5">
                <Titulo titulo="Cadastrar Usuário" nivel={1} />

                <form action="" className="mt-4 row">
                    <div className="col-12 col-md-6 mb-3">
                        <label htmlFor="nome" className="form-label">Nome</label>
                        <input type="text" id="nome" placeholder="Digite o nome" className="form-control" name="nome" value={autor.nome} onChange={atualizarCampo} />
                    </div>

                    <div className="col-12 col-md-6 mb-3">
                        <label htmlFor="nacionalidade" className="form-label">Nacionalidade</label>
                        <input type="text" id="nacionalidade" placeholder="Digite a nacionalidade" className="form-control" name="nacionalidade" value={autor.nacionalidade} onChange={atualizarCampo} />
                    </div>

                    <div className="col-12 col-md-6 mb-3">
                        <label htmlFor="dataNascimento" className="form-label">Data de Nascimento</label>
                        <input type="date" id="dataNascimento" className="form-control" name="dataNascimento" value={autor.dataNascimento} onChange={atualizarCampo} />
                    </div>

                    <div className="col-12 col-md-12 mb-3">
                        <button className="btn btn-primary" type="submit">Cadastrar</button>
                    </div>
                </form>

            </div>
        </>
    )
}