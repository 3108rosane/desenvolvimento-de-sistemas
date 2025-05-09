'use client'
import Header from "@/components/Header";
import "./styles.css"
import Image from "next/image";
import gato from '@/assets/Gato-x-leao.jpg'
import Avatar from "@/components/Avatar";
import { PiPencilLine } from "react-icons/pi";
import Post from "@/components/Post";
import { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { Content } from "next/font/google";
import TextareaCustom from "@/components/TextareaCustom/Index";


export default function Feed() {
    const [posts, setPosts] = useState<any[]>([]);
    const [content, setContent] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);

    console.log

    useEffect(() => {
        loadPost();
    }, [])

    async function loadPost() {
        try {
            setIsLoading(true);
            const response = await axios.get('http://localhost:3001/posts');
            const postSort = response.data.sort((a: any, b: any) => (
                new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
            ))
            setPosts(postSort);
        } catch (e) {
            alert("ERROOO")
        } finally {
            setIsLoading(false);
        }
    }

    async function handleCreatePost(event: FormEvent) {
        event.preventDefault()
        const post = {
            id: String(posts.length + 1),
            content: content,
            publishedAt: new Date().toISOString(),
            author: {
                name: "Rosane Maia",
                role: "Personal Organizer",
                avatarUrl: "https://avatars.githubusercontent.com/u/170477548?v=4&size=64"
            }
        }
        await axios.post("http://localhost:3001/posts", post);

        await loadPost();
        setContent('');

    }


    return (
        <div>
            <Header />
            <div className="container">
                <aside className="sidebar">
                    <Image src={gato} alt="gato" className="gato" />

                    <div className="profile">

                        <Avatar src="https://avatars.githubusercontent.com/u/170477548?v=4&size=64" hasBorder />
                        <strong>Rosane Maia</strong>
                        <span>Personal organizer</span>

                        <footer>
                            <button className="button-edit-profile">
                                <PiPencilLine />
                                Editar seu perfil

                            </button>
                        </footer>

                    </div>


                </aside>


                <main className="main">
                    <form onSubmit={handleCreatePost} className="form-post">

                        <TextareaCustom message={content}
                            setMessage={setContent}
                            title="OQUE VC ESTA PENSANDO???"
                        />
                        <button type="submit">PUBLICAR</button>
                    </form>

                    {isLoading ? (
                        <h1>Carregando...</h1>
                    ) : (
                        posts.map(item => (
                            <Post post={item} key={item.id} setPost={setPosts} />
                        ))
                    )}
                </main>
            </div>
        </div>
    )
}