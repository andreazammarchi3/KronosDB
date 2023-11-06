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
    ticketTable();

    clientTable();

    interventionTable();

    if (ticket.paymentMethod === "TESSERA") {
        cardTable();
    }

    if (ticket.paymentMethod === "SALDO") {
        paymentTable();
        fiscalTable();
    }

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

function cardTable() {
    // Tabella dati tessera
    const firstRowPaymentData = [
        "Metodo di Pagamento",
        "Tessera N.",
        "Ore Totali",
        "Ore Residue pre-ticket",
        "Ore Residue post-ticket"
    ];
    const paymentData = [
        ticket.paymentMethod,
        ticket.cardNumber,
        ticket.cardTotalHours,
        ticket.cardRemainingHours,
        ticket.cardRemainingHours - ticket.workingHours - ticket.transferRange / 2
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

function paymentTable() {
    // Tabella dati pagamento
    const firstRowPaymentData = [
        "Metodo di Pagamento",
        "Extra",
        "Prezzo unitario",
        "Q.tà",
        "Totale",
    ];
    const paymentData = [
        ticket.paymentMethod,
        "Assistenza",
        formatNumber(ticket.workingHourPrice),
        ticket.workingHours,
        formatNumber(ticket.workingHours * ticket.workingHourPrice)
    ];
    const transferData = [
        null,
        "Trasferta",
        formatNumber(ticket.transferHourPrice),
        ticket.transferRange,
        formatNumber(ticket.transferRange * ticket.transferHourPrice)
    ];
    doc.autoTable({
        head: [firstRowPaymentData],
        body: [paymentData, transferData],
        startY: doc.previousAutoTable.finalY + defaultSpacing,
        styles: styles,
        headStyles: headStyles,
        bodyStyles: bodyStyles,
    });
}

function fiscalTable() {
    // Tabella dati fiscali
    const firstRowFiscalData = ["Totale netto", "Sconto", "IVA", "SALDO"];
    const net = ticket.workingHours * ticket.workingHourPrice + ticket.transferRange * ticket.transferHourPrice;
    const iva = net * 22 / 100;
    const fiscalData = [
        formatNumber(net),
        ticket.discount !== 0 ? formatNumber(ticket.discount) : "-",
        formatNumber(iva),
        formatNumber(net + iva - ticket.discount)
    ];
    doc.autoTable({
        head: [firstRowFiscalData],
        body: [fiscalData],
        startY: doc.previousAutoTable.finalY + defaultSpacing,
        styles: styles,
        headStyles: headStyles,
        bodyStyles: bodyStyles,
    });
}

function formatNumber(n) {
    return '€' + n.toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default generatePDF;