"use client"
import { useState } from "react";

import NavBar from "@/app/components/NavBar/NavBar";
import Titulo from "@/app/components/Titulo/Titulo";
import axios from "axios";

export default function CadastrarUsuario() {

    const [autor, setAutor] = useState({
        nome: "",
        nacionalidade: "",
        dataNascimento: ""
    });

    // controla se o cadastro está sendo enviado para a API
    const [salvando, setSalvando] = useState(false);

    const [mensagemSucesso, setMensagemSucesso] = useState("");
    const [erro, setErro] = useState("");

    function atualizarCampo(e) {
        // name = e.target.name;
        // value = e.target.value;
        const { name, value } = e.target;
        setAutor(
            (dadosAtuais) => ({
                ...dadosAtuais,
                [name]: value
            })
        )
    }


    // Função para cadastar o autor
    async function cadastrarAutor(event) {
        event.preventDefault();

        setSalvando(true)
        setMensagemSucesso("")
        setErro("")

        try {
            await axios.post("http://localhost:3001/autores", autor)
            setMensagemSucesso("Autor cadastrado com sucesso!")
            setAutor({
                nome: "",
                nacionalidade: "",
                dataNascimento: ""
            })
        } catch {
            
            setErro("Não foi possível cadastrar o autor...")

        } finally {
            setSalvando(false)
        }

    }






    return (
        <>
            <NavBar />
            <div className="container mt-5">

                <Titulo titulo="Cadastrar Usuário" nivel={1} />

                {
                    mensagemSucesso && (
                        <div className="alert alert-success mt-3">
                            {mensagemSucesso}
                        </div>
                    )
                }

                {
                    erro && (
                        <div className="alert alert-danger mt-3">
                            {erro}
                        </div>
                    )
                }

                {/*  inicio form ------------------------------------------ */}

                <form className="mt-4 row" onSubmit={cadastrarAutor}>

                    <div className="col-12 col-md-6 mb-3">
                        <label htmlFor="nome" className="form-label">Nome</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Digite o nome"
                            id="nome"
                            name="nome"
                            value={autor.nome}
                            onChange={atualizarCampo}
                        />
                    </div>


                    <div className="col-12 col-md-6 mb-3">
                        <label htmlFor="nacionalidade" className="form-label">Nacionalidade</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Digite a nacionalidade" name="nacionalidade"
                            id="nacionalidade"
                            value={autor.nacionalidade}
                            onChange={atualizarCampo}
                        />
                    </div>

                    <div className="col-12 col-md-6 mb-3">
                        <label htmlFor="dataNascimento" className="form-label">Data de Nascimento</label>
                        <input
                            type="date"
                            className="form-control"
                            id="dataNascimento"
                            placeholder="dd/mm/aaaa"
                            name="dataNascimento"
                            value={autor.dataNascimento}
                            onChange={atualizarCampo}
                        />
                    </div>

                    <div className="col-12 col-md-12 mb-3">
                        <button type="submit" className="btn btn-primary" disabled={salvando}>
                            {
                                salvando ? "Cadastrando" : "Cadastrar"
                            }
                        </button>
                    </div>
                </form>

                {/*  fim form ------------------------------------------- */}

            </div>
        </>
    )
}