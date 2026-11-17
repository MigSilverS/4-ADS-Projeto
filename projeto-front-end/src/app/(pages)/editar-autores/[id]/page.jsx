"use client"

import NavBar from "@/app/components/NavBar/NavBar";
import Titulo from "@/app/components/Titulo/Titulo";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditarAutores() {

    const parametros = useParams();
    const id = parametros.id

    const [autor, setAutor] = useState({
        nome: "",
        nacionalidade: "",
        dataNascimento: ""
    })

    const [carregando, setCarregando] = useState(true)
    const [salvando, setSalvando] = useState(false)
    const [erro, setErro] = useState("")
    const [mensagemSucesso, setMensagemSucesso] = useState("");


    useEffect(() => {
        async function buscaAutor() {
            try {
                const resposta = await axios.get(`http://localhost:3001/autores/${id}`)
                setAutor({
                    nome: resposta.data.nome,
                    nacionalidade: resposta.data.nacionalidade,
                    dataNascimento: resposta.data.dataNascimento
                })
            } catch {
                setErro("Não foi possível carregar os dados do autor...")
            } finally {
                setCarregando(false)
            }
        }

        if (id) {
            buscaAutor()
        }

    }, [id])

    function atualizarCampo(e) {
        const { name, value } = e.target;
        setAutor(
            (dadosAtuais) => ({
                ...dadosAtuais,
                [name]: value
            })
        )
    }

    async function salvarAlteracoes(event) {
        event.preventDefault()

        setSalvando(true)
        setMensagemSucesso("")
        setErro("")

        try {
            await axios.patch(`http://localhost:3001/autores/${id}`, autor)
            setMensagemSucesso("Autor editado com sucesso!")
        } catch {

            setErro("Não foi possível editar o autor...")

        } finally {
            setSalvando(false)
        }
    }

    return (
        <>
            <NavBar />
            <div className="container mt-3" onSubmit={salvarAlteracoes}>
                <Titulo titulo="Editar Autores" nivel={1} />

                {
                    carregando ? (
                        <p className="alert alert-dark mt-3">
                            carregando dados do autor...
                        </p>
                    ) : erro && !autor.nome ? (
                        <div className="alert alert-danger mt-3">
                            {erro}
                        </div>
                    ) : (
                        <>
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
                        </>
                    )
                }

                <form className="mt-4 row">

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
                                salvando ? "Editando" : "Editar"
                            }
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}