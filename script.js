document.addEventListener("DOMContentLoaded", function() {
  // Glitch Effect Recovery
  document.getElementById("recover-btn").addEventListener("click", function() {
    document.getElementById("glitch-screen").style.display = "none";
    document.getElementById("main-content").classList.remove("hidden");
  });

  // Menú Desplegable
  const menuToggle = document.getElementById("menu-toggle");
  menuToggle.addEventListener("click", function(e) {
    e.stopPropagation();
    menuToggle.classList.toggle("active");
    const submenu = menuToggle.querySelector(".submenu");
    if (submenu) {
      submenu.classList.toggle("hidden");
    }
  });
  // Cerrar submenu al hacer click fuera
  document.addEventListener("click", function() {
    const submenu = document.querySelector("#menu-toggle .submenu");
    if (submenu && !submenu.classList.contains("hidden")) {
      submenu.classList.add("hidden");
      menuToggle.classList.remove("active");
    }
  });

  // Dark Mode Toggle
  document.getElementById("dark-mode-toggle").addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
  });

  // Ubicación: Mostrar Modal con Mapa
  const locationIcon = document.getElementById("location-icon");
  const locationModal = document.getElementById("location-modal");
  const modalClose = locationModal.querySelector(".close");
  locationIcon.addEventListener("click", function() {
    locationModal.classList.remove("hidden");
  });
  modalClose.addEventListener("click", function() {
    locationModal.classList.add("hidden");
  });
  window.addEventListener("click", function(e) {
    if (e.target === locationModal) {
      locationModal.classList.add("hidden");
    }
  });

  // Buscador Funcional
  const searchBtn = document.getElementById("search-btn");
  searchBtn.addEventListener("click", function() {
    const query = document.getElementById("search").value.trim().toLowerCase();
    if (query) {
      // Simulación de búsqueda en el catálogo (array de ejemplo)
      const catalogo = [
        { nombre: "rolex submariner" },
        { nombre: "patek philippe nautilus" },
        { nombre: "rolex daytona" },
        { nombre: "omega speedmaster" }
      ];
      const found = catalogo.find(item => item.nombre.includes(query));
      if (found) {
        // Redirigir a catalogo.html con el query en la URL
        window.location.href = "catalogo.html?search=" + encodeURIComponent(query);
      } else {
        alert("No se encontró el producto: " + query);
      }
    }
  });

  // Efecto Scroll
  document.addEventListener("scroll", function() {
    document.querySelectorAll("#scroll-effect img").forEach(img => {
      if (img.getBoundingClientRect().top < window.innerHeight * 0.8) {
        img.classList.add("show");
      }
    });
  });

  // Carousel: Mostrar 3 imágenes a la vez y recorrer el 100% del ancho con sliderSpeed configurable
  const carouselContainer = document.querySelector('.carousel-container');
  const carouselImages = document.querySelectorAll('.carousel-container img');
  const totalImages = carouselImages.length;
  const imagesPerSlide = 3;
  const slidesCount = Math.ceil(totalImages / imagesPerSlide);
  let currentSlide = 0;
  const sliderSpeed = 5000; // Velocidad en milisegundos, modificable

  setInterval(() => {
    currentSlide = (currentSlide + 1) % slidesCount;
    carouselContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
  }, sliderSpeed);

  // Chatbot Funcional (Simulación GPT)
  const chatToggle = document.getElementById("chat-toggle");
  const chatbox = document.getElementById("chatbox");
  const sendMsgBtn = document.getElementById("send-msg");
  const chatInput = document.getElementById("chat-input");
  const chatMessages = document.getElementById("chat-messages");

  chatToggle.addEventListener("click", function() {
    chatbox.classList.toggle("hidden");
  });

  sendMsgBtn.addEventListener("click", function() {
    const message = chatInput.value.trim();
    if (message !== "") {
      appendMessage("usuario", message);
      // Simula respuesta de GPT con una demora
      const response = simulateGPTResponse(message);
      setTimeout(() => {
        appendMessage("bot", response);
      }, 1000);
      chatInput.value = "";
    }
  });

  function appendMessage(sender, text) {
    const msgDiv = document.createElement("div");
    msgDiv.classList.add("chat-message", sender);
    msgDiv.textContent = text;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function simulateGPTResponse(message) {
    const msg = message.toLowerCase();
    if (msg.includes("rolex")) {
      return "Encontramos varios modelos de Rolex, ¿te gustaría ver el Rolex Submariner o el Rolex Daytona?";
    } else if (msg.includes("patek")) {
      return "El Patek Philippe Nautilus es uno de nuestros modelos destacados.";
    } else if (msg.includes("precio") || msg.includes("cuánto")) {
      return "Nuestros productos son de alta gama. Por favor, visita el catálogo para ver precios detallados.";
    } else {
      return "Lo siento, no tengo información sobre eso. ¿Podrías reformular tu consulta?";
    }
  }
});
