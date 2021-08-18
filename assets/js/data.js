const STORAGE_KEY = 'BOOKSHELF_KEY';

let bukus = [];

function adaStorage(){
    if (typeof(Storage) === undefined){
        alert('Browser anda tidak mendukung local Storage')
        return false;
    } else {
        return true;
    }
}

function simpanBuku(){
    const parsed = JSON.stringify(bukus);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event('onbooksaved'));
}

function ambilBuku(){
    const serializedData = localStorage.getItem(STORAGE_KEY);

    let buku = JSON.parse(serializedData);

    if(buku !== null){
        bukus = buku;
    }

    document.dispatchEvent(new Event('onbookloaded'));
}

function unggah(){
    if(adaStorage()){
        simpanBuku();
    }
}

function buatObjekBuku(title, author, year, isComplete){
    return {
        id: +new Date(),
        title,
        author,
        year,
        isComplete
    }
}

function cariBuku(idBuku){
    for (buku of bukus){
        if (buku.id === idBuku){
            return buku;
        }
    }
    return null;
}

function cariIndexBuku(idBuku){
    let indeks = 0;
    for (buku of bukus){
        if (buku.id === idBuku){
            return indeks;
        }
        indeks++;
    }
    return -1;
}

function refreshBukus() {
    const belumList = document.getElementById(INCOMPLETED_BOOK_LIST_ID);
    let selesaiList = document.getElementById(COMPLETED_BOOK_LIST_ID);

    for (buku of bukus){
        const bukuStatus = buatBuku(buku.title, buku.author, buku.year, buku.isComplete);
        bukuStatus[BOOK_ITEMID] = buku.id;

        if (buku.isComplete){
            selesaiList.append(bukuStatus);
        } else {
            belumList.append(bukuStatus);
        }
    }
}