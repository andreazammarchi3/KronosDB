import jsPDF from "jspdf";
import 'jspdf-autotable';
import logo from '../../assets/img/logo.png';

const doc = new jsPDF();
let x = 20;
let y = 10;
const defaultSpacing = 10;
let ticket
let client
let technician
const styles = {
    valign: 'middle',
    halign: 'center',
};
const headStyles = {
    fillColor: [150, 150, 150],  // Colore di riempimento (grigio)
    textColor: [255, 255, 255],  // Colore del testo (bianco)
    lineWidth: 0.2,
    lineColor: [0, 0, 0],  // Colore dei bordi (nero)
};
const bodyStyles = {
    fillColor: [240, 240, 240],  // Colore di riempimento (grigio chiaro)
    textColor: [0, 0, 0],  // Colore del testo (nero)
    lineWidth: 0.2,
    lineColor: [0, 0, 0],  // Colore dei bordi (nero)
};

function generatePDF(ti, c, te) {
    ticket = ti
    client = c
    technician = te

    // Logo
    doc.addImage(logo, 'PNG', x, y, 20, 12);

    // Contatti
    doc.setFontSize(8);
    doc.text('Tel: 0543.720915', 200, y=y+5, 'right');
    doc.text('Mail: assistenza@kronos.it', 200, y=y+5, 'right');
    doc.setFontSize(12);

    // Linea Separatore
    doc.setLineWidth(0.5);
    doc.line(10, y=y+10, 200, y);

    // CONTENUTO
    ticketTable()

    clientTable()

    interventionTable()

    paymentTable()


    doc.text('Data ', x, y=doc.previousAutoTable.finalY + defaultSpacing);
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

function ticketTable() {
    // Tabella dati ticket
    const firstRowTicketData = ["Codice Ticket", "Apertura Ticket", "Chiusura Ticket"]
    const ticketData = [ticket.idTicket, ticket.openDate, ticket.closeDate];
    doc.autoTable({
        head: [firstRowTicketData],
        body: [ticketData],
        startY: y=y+10,
        styles: styles,
        headStyles: headStyles,
        bodyStyles: bodyStyles,
    });
}

function clientTable() {
    // Tabella dati cliente
    const firstRowClientData = ["Codice Cliente", "Società", "Indirizzo", "Mail", "Telefono/Cellulare"]
    const clientData = [client.idClient, client.society, client.address, client.mail, client.cellphone];
    doc.autoTable({
        head: [firstRowClientData],
        body: [clientData],
        startY: doc.previousAutoTable.finalY + defaultSpacing,
        styles: styles,
        headStyles: headStyles,
        bodyStyles: bodyStyles,
    });
}

function interventionTable() {
    // Tabella dati intervento
    const firstRowInterventionData = ["Tecnico Assegnato", "Richiesta Cliente", "Lavoro Svolto", "Ore Intervento", "Fascia Intervento"]
    const interventionData = [technician ? technician.fullName : '-', ticket.clientRequest, ticket.workDone, ticket.workingHours, ticket.transferRange];
    doc.autoTable({
        head: [firstRowInterventionData],
        body: [interventionData],
        startY: doc.previousAutoTable.finalY + defaultSpacing,
        styles: styles,
        headStyles: headStyles,
        bodyStyles: bodyStyles,
    });
}

function paymentTable() {
    // Tabella dati pagamento
    const firstRowPaymentData = ["Metodo di Pagamento",
        ticket.paymentMethod === "TESSERA" || ticket.paymentMethod === "TESSERA + SALDO" ? "Tessera N." : null,
        ticket.paymentMethod === "TESSERA" || ticket.paymentMethod === "TESSERA + SALDO" ? "Ore Totali" : null,
        ticket.paymentMethod === "TESSERA" || ticket.paymentMethod === "TESSERA + SALDO" ? "Ore Residue" : null,
        ticket.paymentMethod === "SALDO" || ticket.paymentMethod === "TESSERA + SALDO" ? "Saldo" : null
    ]
    const paymentData = [ticket.paymentMethod,
        ticket.paymentMethod === "TESSERA" || ticket.paymentMethod === "TESSERA + SALDO" ? ticket.cardNumber : null,
        ticket.paymentMethod === "TESSERA" || ticket.paymentMethod === "TESSERA + SALDO" ? ticket.cardTotalHours : null,
        ticket.paymentMethod === "TESSERA" || ticket.paymentMethod === "TESSERA + SALDO" ? ticket.cardRemainingHours : null,
        ticket.paymentMethod === "SALDO" || ticket.paymentMethod === "TESSERA + SALDO" ? ticket.price : null
    ];
    doc.autoTable({
        head: [firstRowPaymentData],
        body: [paymentData],
        startY: doc.previousAutoTable.finalY + defaultSpacing,
        styles: styles,
        headStyles: headStyles,
        bodyStyles: bodyStyles,
    });
}

export default generatePDF;