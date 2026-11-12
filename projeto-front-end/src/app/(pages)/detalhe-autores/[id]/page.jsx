
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";

import NavBar from "@/app/components/NavBar/NavBar";
import Titulo from "@/app/components/Titulo/Titulo";

export default function DetalheAutor() {

    const { id } = useParams();

    const [autor, setAutor] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");

    useEffect(() => {

        async function buscarAutor() {
            try {
                const resposta = await axios.get(
                    `http://localhost:3001/autores/${id}`
                );

                setAutor(resposta.data);
                setErro("");

            } catch (error) {
                console.error("Erro ao buscar autor:", error);
                setErro("Erro ao carregar detalhes do autor.");

            } finally {
                setCarregando(false);
            }
        }

        if (id) {
            buscarAutor();
        }

    }, [id]);

    return (
        <>
            <NavBar />

            <div className="container mt-4">

                <Titulo
                    titulo="Detalhe do Autor"
                    nivel={1}
                />

                {carregando ? (

                    <p className="alert alert-dark mt-3">
                        Carregando detalhes do autor...
                    </p>

                ) : erro ? (

                    <p className="alert alert-danger mt-3">
                        {erro}
                    </p>

                ) : autor ? (

                    <div className="card mt-3">

                        <div className="card-body">

                            <h5 className="card-title">
                                {autor.nome}
                            </h5>

                            <p className="card-text">
                                <strong>Nacionalidade: </strong>
                                {autor.nacionalidade}
                            </p>

                            <p className="card-text">
                                <strong>Data de Nascimento: </strong>
                                {autor.dataNascimento}
                            </p>

                            <Link
                                href="/listar-autores"
                                className="btn btn-secondary"
                            >
                                Voltar
                            </Link>

                        </div>

                    </div>

                ) : (

                    <p className="alert alert-warning mt-3">
                        Autor não encontrado.
                    </p>

                )}

            </div>
        </>
    );
}
