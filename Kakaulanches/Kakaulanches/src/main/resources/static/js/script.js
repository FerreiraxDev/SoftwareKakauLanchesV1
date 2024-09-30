document.addEventListener("DOMContentLoaded", function() {

    document.getElementById('burguer-content').classList.remove('d-none');

    function toggleCategory(categoryToShow) {
            const categories = document.querySelectorAll('.category-items');

            categories.forEach(category => {
                if (category.id === categoryToShow) {
                    category.classList.remove('d-none');
                } else {
                    category.classList.add('d-none');
                }
            });
        }

        document.getElementById('btnradio1').addEventListener('click', function() {
            toggleCategory('burguer-content');
        });

        document.getElementById('btnradio2').addEventListener('click', function() {
            toggleCategory('hotdog-content');
        });

        document.getElementById('btnradio3').addEventListener('click', function() {
            toggleCategory('churrasco-content');
        });

        document.getElementById('btnradio4').addEventListener('click', function() {
                    toggleCategory('espaguete-content');
        });


        document.getElementById('btnradio5').addEventListener('click', function() {
                    toggleCategory('pizza-content');
        });



        document.getElementById('btnradio6').addEventListener('click', function() {
                            toggleCategory('bebidas-content');
        });


        document.getElementById('btnradio7').addEventListener('click', function() {
                            toggleCategory('sobremesas-content');
        });


});
