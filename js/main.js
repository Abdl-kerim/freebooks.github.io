const d = document;
d.querySelector('#input').addEventListener('click', () => {
    const d_n = d.querySelector('#input');
    if (d_n.checked) {
        d.querySelector('#body').style.background = '';
        d.querySelector('#header').style.background = '';
        d.querySelector('#footer').style.background = '';
        const a_123 = d.querySelectorAll('.h2_art');
        const a_1234 = d.querySelectorAll('.links');
        const a_3 = d.querySelectorAll('.p_arts_n');
        let i = 0, j, k, l;
        for (i; i < a_123.length; i++){
            j = a_123[i]; k = a_1234[i]; l = a_3[i];
            j.classList.remove('h2_art_white');
            k.classList.add('links_dia'); k.classList.remove('links_noche');
            l.classList.add('p_arts'); l.classList.remove('p_arts_n');
        }
    } else {
        d.querySelector('#body').style.background = '#333';
        d.querySelector('#header').style.background = 'rgb(164 164 164 / 31%)';
        d.querySelector('#footer').style.background = '#6d655e';
        const a_123 = d.querySelectorAll('.h2_art');
        const a_1234 = d.querySelectorAll('.links');
        const a_3 = d.querySelectorAll('.p_arts');
        let i = 0, j, k, l;
        for (i; i < a_123.length && a_1234.length; i++){
            j = a_123[i]; k = a_1234[i]; l = a_3[i];
            j.classList.add('h2_art_white');
            k.classList.remove('links_dia'); k.classList.add('links_noche');
            l.classList.remove('p_arts'); l.classList.add('p_arts_n');
        }
    };
});

let obj;
const xmlhttp = new XMLHttpRequest();
xmlhttp.onload = function() {
  obj = JSON.parse(this.responseText);
    for (let ez = 0; ez < obj.totalResults; ez++){
        const contenedor_main = d.querySelector('#cont');

        const crea_articulo = d.createElement('article');
            contenedor_main.appendChild(crea_articulo);
            contenedor_main.lastElementChild.setAttribute('class', 'caja_art');
            contenedor_main.lastElementChild.setAttribute('id', `i_${ez}`);
    
        const crea_h2 = d.createElement('h2');
            d.querySelector(`#i_${ez}`).appendChild(crea_h2);
            d.querySelector(`#i_${ez}`).lastElementChild.textContent = `${obj.articulos[ez].nombre}.`;
            d.querySelector(`#i_${ez}`).lastElementChild.setAttribute('class', 'h2_art');
        const crea_p = d.createElement('p');
            d.querySelector(`#i_${ez}`).appendChild(crea_p);
            d.querySelector(`#i_${ez}`).lastElementChild.textContent = `ISBN: ${obj.articulos[ez].isbn}`;
            d.querySelector(`#i_${ez}`).lastElementChild.setAttribute('class', 'p_arts');
        const crea_img = d.createElement('img');
            d.querySelector(`#i_${ez}`).appendChild(crea_img);
            d.querySelector(`#i_${ez}`).lastElementChild.setAttribute('src', `${obj.articulos[ez].portada_libro}`);
            d.querySelector(`#i_${ez}`).lastElementChild.setAttribute('class', 'imagen_art');
            d.querySelector(`#i_${ez}`).lastElementChild.setAttribute('crossorigin', 'anonymous');
    
        const crea_a = d.createElement('a');
            d.querySelector(`#i_${ez}`).appendChild(crea_a);
            d.querySelector(`#i_${ez}`).lastElementChild.textContent = 'Descargar';
            d.querySelector(`#i_${ez}`).lastElementChild.setAttribute('class', 'links links_dia');
            d.querySelector(`#i_${ez}`).lastElementChild.setAttribute('href', `${obj.articulos[ez].url}`);
            d.querySelector(`#i_${ez}`).lastElementChild.setAttribute('download', '');
    }
}
xmlhttp.open("GET", './js/libros.json');
xmlhttp.send();
