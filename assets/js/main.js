document.addEventListener('DOMContentLoaded', function(){

    const submitForm = document.getElementById('inputBook');
    const submitSearch = document.getElementById('searchBook')

    submitForm.addEventListener('submit', function(event){
        event.preventDefault();
        tambahBuku();
    })

    submitSearch.addEventListener('submit', function(event){
        event.preventDefault();
        temukanBuku();
    })

    if(adaStorage()){
        ambilBuku();
    }
})

document.addEventListener('onbooksaved', function(){
    console.log('Perubahan berhasil disimpan.');
})

document.addEventListener('onbookloaded', function(){
    refreshBukus();
})
