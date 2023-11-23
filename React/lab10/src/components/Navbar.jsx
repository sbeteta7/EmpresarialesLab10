import categoriaServices from "../services/categoriaServices";
import React from "react";
import { useEffect,useState } from "react";
import { Link } from "@mui/material";

function Navbar() {
    const [categorias, setCategorias] = useState([]);
    useEffect(()=>{
        categoriaServices.getAll().then(response =>{
            setCategorias(response.data);
            console.log(response.data)
        }).catch(error=>{
          console.log(error);
        })
      })

    return(<>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container px-4 px-lg-5">
                <a class="navbar-brand" href="#!">TIENDA VIRTUAL </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                        <li class="nav-item"><a class="nav-link active" aria-current="page" href="/">HOME</a></li>
                       { categorias.map((categoria)=>(
                            <li class="nav-item " key={categoria.id}>
                                <Link href={`/${categoria.id}/`} className="nav-link" underline="none" color="inherit">
                                {categoria.nombre}
                                </Link>
                                </li>
                       ))
                        }
                    </ul>

                </div>
            </div>
        </nav>
    </>)

    
}

export default Navbar