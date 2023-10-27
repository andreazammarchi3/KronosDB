import jsPDF from "jspdf";
import logo from '../../assets/img/logo.png';

function generatePDF(ticket, client, technician) {
    const doc = new jsPDF();
    let x = 10;
    let y = 10;

    // Logo
    doc.addImage(logo, 'PNG', x, y, 20, 12);

    // Contatti
    doc.setFontSize(8);
    doc.text('Tel: 0543.720915', 200, y=y+5, 'right');
    doc.text('Mail: assistenza@kronos.it', 200, y=y+5, 'right');
    doc.setFontSize(12);

    // Disegna una linea come separatore tra il titolo e il resto del contenuto
    doc.setLineWidth(0.5);
    doc.line(10, y=y+10, 200, y);

    // Contenuto
    doc.text(`Ticket ${ticket.idTicket}`, x, y=y+10);
    doc.text(`Cliente: ${client.idClient} - ${client.society}`, x, y=y+10)
    doc.text(`Tecnico assegnato: ${technician ? technician.fullName : '-'}`, x, y=y+10)
    doc.text(`Data apertura: ${ticket.openDate}`, x, y=y+10);
    doc.text(`Data chiusura: ${ticket.closeDate}`, x, y=y+10);
    doc.text(`Richiesta: ${ticket.clientRequest}`, x, y=y+10);
    doc.text(`Lavoro svolto: ${ticket.workDone}`, x, y=y+10);
    doc.text('Ore intervento: ' + ticket.workingHours, x, y=y+10);
    doc.text('Fascia intervento: ' + ticket.transferRange, x, y=y+10);
    doc.text('Metodo di pagamento: ' + ticket.paymentMethod, x, y=y+10);
    if (ticket.paymentMethod === 'TESSERA' || ticket.paymentMethod === 'TESSERA + SALDO') {
        doc.text('Tessera n.: ' + ticket.cardNumber, x, y=y+10);
        doc.text('Ore totali: ' + ticket.cardTotalHours, x, y=y+10);
        doc.text('Ore residue: ' + ticket.cardRemainingHours, x, y=y+10);
    }
    if (ticket.paymentMethod === 'SALDO' || ticket.paymentMethod === 'TESSERA + SALDO') {
        doc.text('Saldo: €' + ticket.price, x, y=y+10);
    }
    doc.text('Data ', x, y=y+20);
    doc.text(new Date().toLocaleDateString(), x, y=y+10);
    doc.text('Firma cliente:', 190, y=y-10, 'right');
    if (ticket.signatureClient != null) {
        doc.addImage(dataURLtoFile(ticket.signatureClient, 'signature.png'), 'PNG', 160, y=y+5, 50, 25);
    }

    // Salva il PDF con un nome appropriato
    doc.save(`Ticket_${ticket.idTicket}.pdf`);
}

function dataURLtoFile(dataurl) {
    if (dataurl === null) {
        return null
    } else if (typeof dataurl === 'string') {
        return dataurl;
    } else {
        return null;
    }
}

export default generatePDF;