import jsPDF from "jspdf";

function generatePDF(ticket, client, technician) {
    const doc = new jsPDF();
    let x = 10;
    let y = 10;

    // Contenuto della fattura
    doc.text(`Ticket ${ticket.idTicket}`, x, y);
    doc.text(`Cliente: ${client.idClient} - ${client.society}`, x, y=y+10)
    doc.text(`Tecnico assegnato: ${technician ? technician.fullName : '-'}`, 10, y=y+10)
    doc.text(`Data apertura: ${ticket.openDate}`, 10, y=y+10);
    doc.text(`Data chiusura: ${ticket.closeDate}`, 10, y=y+10);
    doc.text(`Richiesta: ${ticket.clientRequest}`, 10, y=y+10);
    doc.text(`Lavoro svolto: ${ticket.workDone}`, 10, y=y+10);
    doc.text('Ore intervento: ' + ticket.workingHours, 10, y=y+10);
    doc.text('Fascia intervento: ' + ticket.transferRange, 10, y=y+10);
    doc.text('Metodo di pagamento: ' + ticket.paymentMethod, 10, y=y+10);
    if (ticket.paymentMethod === 'TESSERA' || ticket.paymentMethod === 'TESSERA + SALDO') {
        doc.text('Tessera: ' + ticket.cardNumber, 10, y=y+10);
        doc.text('Ore totali: ' + ticket.cardTotalHours, 10, y=y+10);
        doc.text('Ore residue: ' + ticket.cardRemainingHours, 10, y=y+10);
    }
    if (ticket.paymentMethod === 'SALDO' || ticket.paymentMethod === 'TESSERA + SALDO') {
        doc.text('Saldo: €' + ticket.price, 10, y=y+10);
    }
    doc.text('Data: ', 10, y=y+20);
    doc.text(new Date().toLocaleDateString(), 10, y=y+10);
    doc.text('Firma cliente:', 150, y=y-10);
    if (ticket.signatureClient != null) {
        doc.addImage(dataURLtoFile(ticket.signatureClient, 'signature.png'), 'PNG', 150, y=y+5, 50, 25);
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