const { test, expect } = require('@playwright/test');
const fs = require('fs');

test('Validate Loan Flat File', async ({}) => {
    const filePath = 'loans_data.txt';

    // Check if the file exists
    expect(fs.existsSync(filePath)).toBeTruthy();

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    console.log('--- Raw File Content ---\n', fileContent, '\n------------------------');

    const lines = fileContent.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    expect(lines.length).toBeGreaterThan(2); // At least HEADER, one DETAIL, and TRAILER

    // Validate HEADER
    const header = lines[0].split('|');
    expect(header[0]).toBe('HEADER');
    expect(header.length).toBe(10); // Ensure 10 fields exist

    // Validate DETAIL records
    let detailCount = 0;
    let totalLoanAmount = 0;

    for (let i = 1; i < lines.length - 1; i++) {
        const columns = lines[i].split('|');
        expect(columns.length).toBe(10); // Ensure correct number of fields
        expect(columns[0]).toBe('DETAIL');

        detailCount++;

        const loanAmount = parseFloat(columns[4]);
        expect(loanAmount).not.toBeNaN();
        expect(loanAmount).toBeGreaterThan(0);
        totalLoanAmount += loanAmount;

        // Validate dates
        const originationDate = new Date(columns[7]);
        const maturityDate = new Date(columns[8]);
        console.log(originationDate, maturityDate);
        expect(originationDate).toBeInstanceOf(Date);
        expect(maturityDate).toBeInstanceOf(Date);
        expect(originationDate.getTime()).toBeLessThan(maturityDate.getTime());
    }

    // Validate TRAILER
    const trailer = lines[lines.length - 1].split('|');
    expect(trailer[0]).toBe('TRAILER');
    expect(parseInt(trailer[1])).toBe(detailCount);
    expect(parseFloat(trailer[3])).toBeCloseTo(totalLoanAmount, 2);

    console.log('✅ File validation passed successfully!');
});