document.addEventListener('DOMContentLoaded', () => {
  // Existing Swiper initialization code
  const swiper = new Swiper('.swiper', {
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    },
    effect: 'fade',
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    }
  });

  // Select all elements with the class "num"
  let nums = document.querySelectorAll('.num');

  // Function to start the counter animation
  const startCount = (i) => {
    let max = parseInt(i.dataset.val);
    let count = 0;

    let counterInterval = setInterval(() => {
      i.textContent = count++;

      if (count > max) {
        clearInterval(counterInterval);
      }
    }, 60);
  };

  // Function to check if an element is in the viewport
  const isInViewport = (element) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  // Function to handle scroll events and trigger the counter animation
  const handleScroll = () => {
    nums.forEach((num) => {
      if (isInViewport(num) && !num.classList.contains('counted')) {
        startCount(num);
        num.classList.add('counted');
      }
    });

    // Sticky navbar functionality
    const navbar = document.querySelector(".navbar");
    const sticky = navbar.offsetTop;

    if (window.scrollY > sticky) {
      navbar.classList.add("sticky");
    } else {
      navbar.classList.remove("sticky");
    }
  };

  // Event listener for scroll events
  window.addEventListener('scroll', handleScroll);

  // Initial check for elements in the viewport when the page loads
  handleScroll();

  // Email send function
  const emailForm = document.querySelector('form');
  const name = document.getElementById('Name');
  const email = document.getElementById('Email');
  const phone = document.getElementById('Phone');
  const subject = document.getElementById('Subject');
  const message = document.getElementById('Message');

  const sendEmail = () => {
    // Check if the elements are not null before accessing their value
    const bodyMessage = `Name: ${name ? name.value : 'N/A'}\nEmail: ${email ? email.value : 'N/A'}\nPhone: ${phone ? phone.value : 'N/A'}\nSubject: ${subject ? subject.value : 'No Subject'}\nMessage: ${message ? message.value : 'N/A'}`;

    Email.send({
      Host: "smtp.elasticemail.com",
      Username: "blkattgaming@gmail.com",
      Password: "D2A51A479C6BD878012C70760A2A6B888297",
      To: 'blkattgaming@gmail.com',
      From: 'blkattgaming@gmail.com',
      Subject: subject ? subject.value : 'No Subject',
      Body: bodyMessage,
    }).then(
      (message) => alert(message)
    );
  };

  emailForm.addEventListener('submit', (e) => {
    e.preventDefault();
    sendEmail();
    emailForm.reset();
  });
});

