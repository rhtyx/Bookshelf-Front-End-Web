const INCOMPLETED_BOOK_LIST_ID = 'incompleteBookshelfList';
const COMPLETED_BOOK_LIST_ID = 'completeBookshelfList';
const BOOK_ITEMID = 'itemId'

function buatTombol(kelasButton, eventListener){
    const tombol = document.createElement('button');

    tombol.classList.add(kelasButton);

    // tombol.append(teks);
    tombol.addEventListener('click', function(event){
        eventListener(event);
    })
    return tombol;
}

function tombolSelesai(){
    return buatTombol('green', function(event){
        bukuSelesai(event.target.parentElement.parentElement);
    })
}

function tombolHapus(){
    return buatTombol('red', function(event){
        hapusBuku(event.target.parentElement.parentElement);
    })
}

function tombolBelum(){
    return buatTombol('blue', function(event){
        bukuBelumSelesai(event.target.parentElement.parentElement);
    })
}

function buatBuku(title, author, year, isComplete){
    const tulisJudul = document.createElement('h3');
    tulisJudul.innerText = title;

    const tulisPenulis = document.createElement('p');
    tulisPenulis.innerText = author;

    const tulisTahun = document.createElement('p');
    tulisTahun.innerText = year;

    const article = document.createElement('article');
    article.classList.add('book_item');
    article.append(
        tulisJudul,
        tulisPenulis,
        tulisTahun
    );

    const div = document.createElement('div');
    div.classList.add('action')
    
    if (isComplete){
        div.append(
            tombolBelum(),
            tombolHapus()
        )
        article.append(div)
    } else {
        div.append(
            tombolSelesai(),
            tombolHapus()
        )
        article.append(div)
    }
    
    return article;
}

function tambahBuku(){
    const listBelumSelesai = document.getElementById(INCOMPLETED_BOOK_LIST_ID);
    const listSelesai = document.getElementById(COMPLETED_BOOK_LIST_ID);

    const title = document.getElementById('inputBookTitle').value;
    const author = document.getElementById('inputBookAuthor').value;
    const year = document.getElementById('inputBookYear').value;
    const isComplete = document.getElementById('inputBookIsComplete').checked;

    const buku = buatBuku(title, author, year, isComplete);
    const bukuObjek = buatObjekBuku(title, author, year, isComplete);

    buku[BOOK_ITEMID] = bukuObjek.id;
    bukus.push(bukuObjek);

    if (!isComplete){
        listBelumSelesai.append(buku);
    } else {
        listSelesai.append(buku);
    }
    unggah();
}

function bukuSelesai(elemenBuku){
    const listSelesai = document.getElementById(COMPLETED_BOOK_LIST_ID);
    
    const title = elemenBuku.querySelector('.book_item > h3').innerText;
    const pDalamArticle= elemenBuku.querySelectorAll('.book_item > p');
    const author = pDalamArticle[0].innerText;
    const year = pDalamArticle[1].innerText

    const bukuSelesai = buatBuku(title, author, year, true);
    const buku = cariBuku(elemenBuku[BOOK_ITEMID]);
    buku.isComplete = true;
    bukuSelesai[BOOK_ITEMID] = buku.id;

    listSelesai.append(bukuSelesai);
    elemenBuku.remove()

    unggah();
}

function bukuBelumSelesai(elemenBuku){
    const listBelumSelesai = document.getElementById(INCOMPLETED_BOOK_LIST_ID);

    const title = elemenBuku.querySelector('.book_item > h3').innerText;
    const pDalamArticle= elemenBuku.querySelectorAll('.book_item > p');
    const author = pDalamArticle[0].innerText;
    const year = pDalamArticle[1].innerText

    const bukuSelesai = buatBuku(title, author, year, false);
    const buku = cariBuku(elemenBuku[BOOK_ITEMID]);
    buku.isComplete = false;
    bukuSelesai[BOOK_ITEMID] = buku.id;

    listBelumSelesai.append(bukuSelesai);
    elemenBuku.remove()

    unggah();
}

function hapusBuku(elemenBuku){
    const posisiBuku = cariIndexBuku(elemenBuku[BOOK_ITEMID]);

    const freeze = document.getElementById('freeze')
    freeze.classList.remove('hidden')

    const del = document.getElementById('delete');
    del.addEventListener('click', function(){
        const dlt = document.getElementById('delete').innerText;

        if (dlt == 'Delete'){
            freeze.classList.add('hidden');

            bukus.splice(posisiBuku, 1);

            elemenBuku.remove();
            unggah();
        }
    })

    const cancel = document.getElementById('cancel');
    cancel.addEventListener('click', function(){
        freeze.classList.add('hidden');
    })
}

function hapusArray(array){
    for (n of array){
        n.remove();
    }
}

function temukanBuku(){
    const articles = document.querySelectorAll('article')
    hapusArray(articles);

    const belumList = document.getElementById(INCOMPLETED_BOOK_LIST_ID);
    let selesaiList = document.getElementById(COMPLETED_BOOK_LIST_ID);
    let index = [];

    const cariJudul = document.getElementById('searchBookTitle').value.toLowerCase();

    for (buku of bukus){
        const judulBuku = buku.title.toLowerCase().split(' ')
        for (judul of judulBuku){
            if (judul === cariJudul){
                index.push(buku.id);
            }
        }
    }

    for (id of index){
        const buku = bukus[cariIndexBuku(id)];
        
        const bukuStatus = buatBuku(buku.title, buku.author, buku.year, buku.isComplete);
        bukuStatus[BOOK_ITEMID] = buku.id;

        if (buku.isComplete){
            selesaiList.append(bukuStatus)
        } else {
            belumList.append(bukuStatus)
        }
    }

    if (cariJudul === ''){
        refreshBukus();
    }
}
