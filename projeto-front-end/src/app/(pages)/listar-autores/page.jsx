
"use client";

import NavBar from "@/app/components/NavBar/NavBar";
import Titulo from "@/app/components/Titulo/Titulo";
import Link from "next/link";

import axios from "axios";
import { useEffect, useState } from "react";

export default function ListarAutores() {

    const [autores, setAutores] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");

    const [exclusao, setExclusao] = useState({
        autor: null,
        excluindo: false,
        erro: "",
        sucesso: ""
    });

    useEffect(() => {

        async function buscarAutores() {
            try {
                const resposta = await axios.get(
                    "http://localhost:3001/autores"
                );

                setAutores(resposta.data);
                setErro("");

            } catch (erro) {
                console.error("Erro ao buscar autores:", erro);
                setErro("Erro ao carregar autores.");

            } finally {
                setCarregando(false);
            }
        }

        buscarAutores();

    }, []);

    // Limpar mensagem de sucesso após 5 segundos
    useEffect(() => {

        if (!exclusao.sucesso) {
            return;
        }

        const temporizador = setTimeout(() => {
            setExclusao((estadoAtual) => ({
                ...estadoAtual,
                sucesso: ""
            }));
        }, 5000);

        return () => clearTimeout(temporizador);

    }, [exclusao.sucesso]);

    // Enviar exclusão para API
    async function excluirAutor() {

        if (!exclusao.autor || exclusao.excluindo) {
            return;
        }

        const autorSelecionado = exclusao.autor;

        setExclusao((estadoAtual) => ({
            ...estadoAtual,
            excluindo: true,
            erro: ""
        }));

        try {

            await axios.delete(
                `http://localhost:3001/autores/${autorSelecionado.id}`
            );

            // Atualiza a lista
            setAutores((autoresAtuais) =>
                autoresAtuais.filter(
                    (autor) => autor.id !== autorSelecionado.id
                )
            );

            setExclusao((estadoAtual) => ({
                ...estadoAtual,
                autor: null,
                sucesso: "Autor excluído com sucesso!"
            }));

           // Fecha o modal Bootstrap
       const modal = document.getElementById("exampleModal");

            if (modal) {
                const botaoFechar = modal.querySelector(
                    '[data-bs-dismiss="modal"]'
                );

                botaoFechar?.click();
            }
            
        } catch (erro) {

            console.error("Erro ao excluir autor:", erro);

            setExclusao((estadoAtual) => ({
                ...estadoAtual,
                erro: "Não foi possível excluir o autor. Tente novamente mais tarde."
            }));

        } finally {

            setExclusao((estadoAtual) => ({
                ...estadoAtual,
                excluindo: false
            }));

        }
    }

    return (
        <>
            <NavBar />

            <div className="container mt-4">

                <Titulo
                    titulo="Lista de Autores"
                    nivel={1}
                />

                {exclusao.sucesso && (
                    <div className="alert alert-success mt-3">
                        {exclusao.sucesso}
                    </div>
                )}

                {carregando ? (

                    <p className="mt-3 alert alert-dark">
                        Carregando autores...
                    </p>

                ) : erro ? (

                    <div className="alert alert-danger mt-3">
                        {erro}
                    </div>

                ) : (

                    <table className="table table-hover table-striped">

                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Nacionalidade</th>
                                <th>Data de Nascimento</th>
                                <th>Ações</th>
                            </tr>
                        </thead>

                        <tbody>

                            {autores.map((autor) => (

                                <tr key={autor.id}>

                                    <td>{autor.nome}</td>

                                    <td>{autor.nacionalidade}</td>

                                    <td>{autor.dataNascimento}</td>

                                    <td>

                                        <Link
                                            href={`/detalhe-autores/${autor.id}`}
                                            className="btn btn-primary"
                                            title="Detalhes"
                                        >
                                            Detalhes
                                        </Link>

                                        <a
                                            href="#"
                                            className="btn btn-warning mx-2"
                                            title="Editar"
                                        >
                                            Editar
                                        </a>

                                        <button
                                            type="button"
                                            className="btn btn-danger"
                                            title="Excluir"
                                            data-bs-toggle="modal"
                                            data-bs-target="#exampleModal"
                                            onClick={() => {
                                                setExclusao((estadoAtual) => ({
                                                    ...estadoAtual,
                                                    autor: autor,
                                                    erro: ""
                                                }));
                                            }}
                                        >
                                            Excluir
                                        </button>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                )}

            </div>

            {/* Início modal Bootstrap */}

            <div
                className="modal fade"
                id="exampleModal"
                tabIndex={-1}
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >

                <div className="modal-dialog">

                    <div className="modal-content">

                        <div className="modal-header">

                            <h1
                                className="modal-title fs-5"
                                id="exampleModalLabel"
                            >
                                Confirmar Exclusão
                            </h1>

                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Fechar"
                                disabled={exclusao.excluindo}
                            ></button>

                        </div>

                        <div className="modal-body">

                            <p>
                                Tem certeza que deseja excluir o autor?
                            </p>

                            {exclusao.autor && (
                                <>

                                    <p>
                                        <strong>Nome:</strong>{" "}
                                        {exclusao.autor.nome}
                                    </p>

                                    <p>
                                        <strong>Nacionalidade:</strong>{" "}
                                        {exclusao.autor.nacionalidade}
                                    </p>

                                    <p>
                                        <strong>Data de Nascimento:</strong>{" "}
                                        {exclusao.autor.dataNascimento}
                                    </p>

                                </>
                            )}

                            {exclusao.erro && (
                                <div className="alert alert-danger">
                                    {exclusao.erro}
                                </div>
                            )
                        }

                        </div>

                        <div className="modal-footer">

                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                                disabled={exclusao.excluindo}
                            >
                                Cancelar
                            </button>

                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={excluirAutor}
                                disabled={exclusao.excluindo || !exclusao.autor}
                            >
                                {exclusao.excluindo
                                    ? "Excluindo..."
                                    : "Confirmar Exclusão"}
                            </button>

                        </div>

                    </div>

                </div>

            </div>

            {/* Fim modal Bootstrap */}

        </>
    );
}
