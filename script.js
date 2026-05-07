document.addEventListener('DOMContentLoaded', () => {
    // Slide Navigation Elements
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const progressBar = document.getElementById('progress-bar');
    const currentSlideNum = document.getElementById('current-slide-num');
    
    let currentSlide = 0;
    const totalSlides = slides.length;

    // Initialize
    updateSlides();

    // Event Listeners for Navigation
    prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
    nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            goToSlide(currentSlide - 1);
        } else if (e.key === 'ArrowRight' || e.key === ' ') {
            goToSlide(currentSlide + 1);
        }
    });

    // Navigation Logic
    function goToSlide(index) {
        if (index < 0 || index >= totalSlides) return;
        currentSlide = index;
        updateSlides();
    }

    function updateSlides() {
        slides.forEach((slide, index) => {
            if (index === currentSlide) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });

        // Update Controls
        currentSlideNum.textContent = currentSlide + 1;
        progressBar.style.width = `${((currentSlide + 1) / totalSlides) * 100}%`;
        
        // Button States
        prevBtn.style.opacity = currentSlide === 0 ? '0.3' : '1';
        prevBtn.style.pointerEvents = currentSlide === 0 ? 'none' : 'auto';
        
        nextBtn.style.opacity = currentSlide === totalSlides - 1 ? '0.3' : '1';
        nextBtn.style.pointerEvents = currentSlide === totalSlides - 1 ? 'none' : 'auto';
    }

    // ChatGPT Demo Logic
    const generateBtn = document.getElementById('generate-btn');
    const animalInput = document.getElementById('animal');
    const locationInput = document.getElementById('location');
    const objectInput = document.getElementById('object');
    const chatOutput = document.getElementById('chat-output');

    generateBtn.addEventListener('click', () => {
        const animal = animalInput.value.trim() || 'penguin';
        const location = locationInput.value.trim() || 'volcano';
        const object = objectInput.value.trim() || 'skateboard';

        generateBtn.disabled = true;
        generateBtn.textContent = 'Generating...';
        
        // Clear previous output
        chatOutput.innerHTML = '';
        
        // Simulate thinking delay
        setTimeout(() => {
            const story = `One day, a brave ${animal} decided to visit a scorching ${location}. While exploring the fiery landscape, it stumbled upon a perfectly intact ${object}. With a gleeful shout, the ${animal} hopped on the ${object} and surfed down a river of lava, becoming the coolest legend the ${location} had ever seen!`;
            
            typeWriterEffect(story, 0);
        }, 800);
    });

    function typeWriterEffect(text, index) {
        if (index === 0) {
            chatOutput.innerHTML = '<p></p>';
        }
        
        if (index < text.length) {
            chatOutput.querySelector('p').innerHTML += text.charAt(index);
            // Scroll to bottom
            chatOutput.scrollTop = chatOutput.scrollHeight;
            
            // Randomize typing speed slightly for realism
            const speed = Math.random() * 30 + 10;
            setTimeout(() => typeWriterEffect(text, index + 1), speed);
        } else {
            generateBtn.disabled = false;
            generateBtn.textContent = 'Generate Story';
        }
    }

    // Math Solver Demo Logic (Slide 5)
    const solveBtn = document.getElementById('solve-btn');
    const mathOutput = document.getElementById('math-output');

    if (solveBtn && mathOutput) {
        // Ensure whitespace is preserved for newlines
        mathOutput.style.whiteSpace = 'pre-wrap';
        
        solveBtn.addEventListener('click', () => {
            solveBtn.disabled = true;
            solveBtn.textContent = 'Solving...';
            
            mathOutput.innerHTML = '';
            
            setTimeout(() => {
                const solution = `Let's find the value of x!
                
Equation: 3x + 5 = 17

Step 1: Subtract 5 from both sides.
3x = 17 - 5
3x = 12

Step 2: Divide both sides by 3.
x = 12 / 3

Final Answer:
x = 4`;

                typeWriterMath(solution, 0);
            }, 600);
        });
        
        function typeWriterMath(text, index) {
            if (index === 0) {
                mathOutput.innerHTML = '<span></span>';
            }
            
            if (index < text.length) {
                const span = mathOutput.querySelector('span');
                // Replace newline characters with <br> for HTML rendering, or just use textContent. 
                // Since white-space: pre-wrap is set, textContent works perfectly.
                span.textContent += text.charAt(index);
                mathOutput.scrollTop = mathOutput.scrollHeight;
                
                const speed = Math.random() * 20 + 10;
                setTimeout(() => typeWriterMath(text, index + 1), speed);
            } else {
                solveBtn.disabled = false;
                solveBtn.textContent = 'Solve';
            }
        }
    }

    // Recipe Generator Demo Logic (Slide 6)
    const ingredientBoxes = document.querySelectorAll('.ingredient-box');
    const generateRecipeBtn = document.getElementById('generate-recipe-btn');
    const recipeOutput = document.getElementById('recipe-output');

    if (ingredientBoxes.length > 0 && generateRecipeBtn && recipeOutput) {
        recipeOutput.style.whiteSpace = 'pre-wrap';
        let selectedIngredients = [];

        ingredientBoxes.forEach(box => {
            box.addEventListener('click', () => {
                const ingredient = box.textContent;
                
                if (box.classList.contains('selected')) {
                    box.classList.remove('selected');
                    selectedIngredients = selectedIngredients.filter(item => item !== ingredient);
                } else {
                    if (selectedIngredients.length < 4) {
                        box.classList.add('selected');
                        selectedIngredients.push(ingredient);
                    }
                }
                
                // Update Button
                if (selectedIngredients.length === 4) {
                    generateRecipeBtn.disabled = false;
                    generateRecipeBtn.style.opacity = '1';
                    generateRecipeBtn.style.pointerEvents = 'auto';
                    generateRecipeBtn.textContent = 'Generate Recipe';
                } else {
                    generateRecipeBtn.disabled = true;
                    generateRecipeBtn.style.opacity = '0.5';
                    generateRecipeBtn.style.pointerEvents = 'none';
                    generateRecipeBtn.textContent = `Generate Recipe (${selectedIngredients.length}/4 selected)`;
                }
            });
        });

        generateRecipeBtn.addEventListener('click', () => {
            generateRecipeBtn.disabled = true;
            generateRecipeBtn.textContent = 'Generating...';
            recipeOutput.innerHTML = '';
            
            setTimeout(() => {
                const ingredientsList = selectedIngredients.join(', ');
                const recipe = `Here is a custom recipe using ${ingredientsList}!

Gourmet Fusion Bowl
Prep: 10m | Cook: 20m

1. Heat a splash of olive oil in a pan.
2. Carefully prepare the ${selectedIngredients[0]} and ${selectedIngredients[1]} until perfectly golden.
3. Gently fold in the ${selectedIngredients[2]} and ${selectedIngredients[3]} and let it simmer.
4. Serve hot and enjoy your AI-crafted culinary masterpiece!`;

                typeWriterRecipe(recipe, 0);
            }, 600);
        });

        function typeWriterRecipe(text, index) {
            if (index === 0) {
                recipeOutput.innerHTML = '<span></span>';
            }
            
            if (index < text.length) {
                const span = recipeOutput.querySelector('span');
                span.textContent += text.charAt(index);
                recipeOutput.scrollTop = recipeOutput.scrollHeight;
                
                const speed = Math.random() * 20 + 10;
                setTimeout(() => typeWriterRecipe(text, index + 1), speed);
            } else {
                generateRecipeBtn.disabled = false;
                generateRecipeBtn.textContent = 'Generate Recipe';
            }
        }
    }
});
