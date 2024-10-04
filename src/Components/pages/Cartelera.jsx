import React from 'react';
import Layout from './Layout'; // Importa el componente Layout

const Cartelera = () => {
    return (
        <Layout active="cartelera">
            <div className="grid grid-cols-3 gap-4">
            {/* <h2 className="text-xl font-semibold mb-4">Cartelera</h2> */}
                {/* Contenido de la cartelera */}
                <div className="bg-gray-200 p-4 rounded-lg" style={{ height: "300px" }}>Imagen 1</div>
                <div className="bg-gray-200 p-4 rounded-lg" style={{ height: "300px" }}>Imagen 2</div>
                <div className="bg-gray-200 p-4 rounded-lg" style={{ height: "300px" }}>Imagen 3</div>
                <div className="bg-gray-200 p-4 rounded-lg" style={{ height: "300px" }}>Imagen 4</div>
                <div className="bg-gray-200 p-4 rounded-lg" style={{ height: "300px" }}>Imagen 5</div>
                <div className="bg-gray-200 p-4 rounded-lg" style={{ height: "300px" }}>Imagen 6</div>
                <div className="bg-gray-200 p-4 rounded-lg" style={{ height: "300px" }}>Imagen 7</div>
                <div className="bg-gray-200 p-4 rounded-lg" style={{ height: "300px" }}>Imagen 8</div>
                <div className="bg-gray-200 p-4 rounded-lg" style={{ height: "300px" }}>Imagen 9</div>
                <div className="bg-gray-200 p-4 rounded-lg" style={{ height: "300px" }}>Imagen 10</div>
                <div className="bg-gray-200 p-4 rounded-lg" style={{ height: "300px" }}>Imagen 11</div>
                <div className="bg-gray-200 p-4 rounded-lg" style={{ height: "300px" }}>Imagen 12</div>
            </div>
        </Layout>
    );
};

export default Cartelera;
