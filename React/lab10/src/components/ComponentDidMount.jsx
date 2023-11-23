
import React from "react"
import { useState } from "react"

function ComponentDidMount(){
    fetch('http://127.0.0.1:8000/api/producto')
        .then((response) => {
          console.log(response.json())
        })
        .then((prod) => {
            setProductos(prod)
            setRecuperado(true)
        }) 

    return(<></>)

}

export default ComponentDidMount;