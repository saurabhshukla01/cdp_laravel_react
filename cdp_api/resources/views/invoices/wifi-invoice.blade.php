<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fusionnet Statement</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #ffffff;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 850px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ddd;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            margin-bottom: 20px;
        }
        .header h1 {
            font-size: 22px;
            color: #d82f27;
            margin: 0;
        }
        .details-section {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
        }
        .details-section .left, .details-section .right {
            width: 48%;
        }
        .details-section p {
            margin: 3px 0;
            font-size: 14px;
        }
        .details-section .label {
            font-weight: bold;
        }
        .payment-details {
            margin: 20px 0;
        }
        .payment-details p {
            margin: 3px 0;
            font-size: 14px;
        }
        .payment-table, .summary-table, .charges-table, .combined-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }
        .payment-table th, .summary-table th, .charges-table th {
            background-color: #d82f27; /* Red background for headers */
            color: #ffffff; /* White text for headers */
            font-size: 14px;
            font-weight: bold;
            border: 1px solid #d82f27; /* Red border for header cells */
        }
        .payment-table td, .summary-table td, .charges-table td {
            border: 1px solid #d82f27; /* Red border for cells */
            background-color: #ffffff; /* White background for cells */
            color: #000000; /* Black text for cells */
            padding: 8px;
            text-align: center;
            font-size: 13px;
        }
        .highlight {
            color: #d82f27;
            font-weight: bold;
        }
        .terms {
            background-color: #f0f0f0; /* Light gray background */
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 14px;
            color: #333;
            margin-top: 5px;
        }
        .terms p {
            margin: 10px 0;
            font-style: italic; /* Italicize text */
        }
        .terms p:first-of-type {
            margin-top: 0; /* Remove top margin for the first paragraph */
        }
        .footer {
            border-top: 1px solid #ddd;
            margin-top: 20px;
            padding-top: 10px;
            font-size: 11px;
            color: #333;
        }
        .footer p {
            margin: 3px 0;
        }
        .combined-table td {
            border: 1px solid #d82f27; /* Red border for cells */
            padding: 8px;
        }
        .combined-table .left-col {
            width: 50%;
            background-color: #f5f5f5;
            font-weight: bold;
            text-align: center;
        }
        .combined-table .right-col {
            width: 50%;
            text-align: center;
        }
        .contact-info {
            background-color: #d82f27; /* Red background */
            color: #ffffff; /* White text */
            padding: 10px; /* Add some padding for better appearance */
            text-align: center; /* Center-align text if desired */
            font-size: 14px; /* Adjust font size if needed */
            border-radius: 5px; /* Optional: Rounded corners */
        }        
    </style>
</head>
<body>
    <div class="container">
        <h3>Your Fusionnet Statement</h3>
        <hr/>
        <div class="details-section">
            <div class="left">
                <p><span class="label">Customer Name:</span> SAURABH SHUKLA</p>
                <p><span class="label">Address:</span> Flat no B/071 Gulsan BOTNIA SEC-144 NOIDA ,SECTOR
                    144,NOIDA,UTTAR PRADESH,201301 (09-UP)</p>
                <p><span class="label">COF & Customer Id:</span> 1009556 83858</p>
                <p><span class="label">Plan Name:</span> Super 200Q</p>
                <p><span class="label">Usages:</span> 721 GB ( 0 GB - FUP )
                </p>
            </div>
            <div class="right">
                <p><span class="label">Statement No.:</span> 838580011</p>
                <p><span class="label">Statement Date:</span> 10/07/2024</p>
                <p><span class="label">Statement Period:</span> 11/07/2024</p>
                <p><span class="label">Closing Balance:</span> 2593.50</p>
                <p><span class="label">Security Deposit:</span> 0.00</p>
                <div class="payment-details">
                    <table class="payment-table">
                        <thead class="highlight">
                            <tr>
                                <th>PAYMENT DETAILS</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>(Card Swipe) 10/07/2024</td>
                                <td>2550.00</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div>
            <table class="summary-table">
                <thead>
                    <tr>
                        <th>Previous Balance</th>
                        <th>Payments</th>
                        <th>Adjustments</th>
                        <th>Charges for this period</th>
                        <th>Closing Balance</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>2613.54</td>
                        <td>2550.00</td>
                        <td>0.00</td>
                        <td>2570.04</td>
                        <td>2593.50</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <p class="contact-info">To register your Services Requests, call us at 9711004444 or email at support@fusionnet.in</p>
        <h3 class="charges-header">Summary of Charges for this Month</h3>
        <table class="combined-table" style="border-collapse: collapse;">
            <tr>
                <td class="left-col">
                    <table class="charges-table" style="width: 100%; border: none;">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Data</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Plan Charges</td>
                                <td>2178.00</td>
                            </tr>
                            <tr>
                                <td>Sub Total</td>
                                <td>2178.00</td>
                            </tr>
                            <tr>
                                <td>SGST</td>
                                <td>196.02</td>
                            </tr>
                            <tr>
                                <td>CGST</td>
                                <td>196.02</td>
                            </tr>
                            <tr>
                                <td>Total</td>
                                <td>2570.04</td>
                            </tr>
                        </tbody>
                    </table>
                </td>
                <td class="right-col">
                    <p><strong>GSTIN:</strong> 09AACCF4701C1Z5</p>
                    <p><strong>HSN/SAC Code:</strong> 998422</p>
                </td>
            </tr>
        </table>
        <p><strong>Terms & Conditions</strong></p>
        <div class="terms">
            <p>1. In the event of any disagreement with charges indicated in this statement the same should be informed to Fusionnet Web Services within 30 days from the receipt of the bill, failing which shall be construed that all charges indicated in the statement are in order.</p>
            <p>2. A charge of 200/- shall be levied for each Cheque/ECS/SI returned unpaid by the bank due to any reason and may also lead to disconnection of service without prior notice.</p>
            <p>3. In case of termination of your connection/services, security deposit (if applicable) will be refunded after adjustments (if any) within 60 days from the date of receiving the request for disconnection.</p>
            <p>4. Fusionnet Web services reserves full rights to change the Terms & Conditions applicable to tariff plans from time to time.</p>
            <p>5. Refundable Security Deposit is against the CPE (NTU/Router) provided by Fusionnet Web Services Pvt. Ltd. CPE should be in working condition at the time of Refund.</p>
        </div>
        <div class="footer">
            <p><b>FUSIONNET WEB SERVICES PVT. LTD.</b></p>
            <b>Corporate office :</b> Plot No. 16, ATS Tower, Level 2, Sector 135, Noida 201305
            <b>Reg Office :</b> : 711/92 , Deepali, Nehru Place, New Delhi-110 019</p>
        </div>
    </div>
</body>
</html>
