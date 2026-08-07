//  resume 

    async function downloadPDF() {
      // Use browser's print-to-PDF functionality
      const btn = document.querySelector('.download-btn');
      btn.style.display = 'none';

      // Set page title for PDF filename
      const origTitle = document.title;
      document.title = 'Suraj_Kumar_Resume';

      window.print();

      document.title = origTitle;
      btn.style.display = '';
    }
