const fs = require('fs');
const {google} = require('googleapis');

async function fetchEnv() {
    // Google Sheets API 클라이언트 설정
    const auth = new google.auth.GoogleAuth({
        credentials: JSON.parse(process.env.GOOGLE_SHEETS_CREDENTIALS),
        scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({version: 'v4', auth});

    // Google Sheets에서 데이터 가져오기
    const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
    const whiskyRange = 'Whisky!A2:C1001';
    const cocktailRange = 'Cocktail!A2:C200';
    const nonAlcoholRange = 'NonAlcohol!A2:C200';

    const whiskyMenus = mapToJSON(await sheets.spreadsheets.values.get({spreadsheetId, range: whiskyRange}))
    const cocktailMenus = mapToJSON(await sheets.spreadsheets.values.get({spreadsheetId, range: cocktailRange}))
    const nonAlcoholMenus = mapToJSON(await sheets.spreadsheets.values.get({spreadsheetId, range: nonAlcoholRange}))

    const whiskyVariable = `REACT_APP_WHISKY_LIST=${JSON.stringify(whiskyMenus)}\n`
    const cocktailVariable = `REACT_APP_COCKTAIL_LIST=${JSON.stringify(cocktailMenus)}\n`
    const nonAlcoholVariable = `REACT_APP_NON_ALCOHOL_LIST=${JSON.stringify(nonAlcoholMenus)}\n`

    // .env 파일 생성
    fs.writeFileSync('.env.production', whiskyVariable);
    fs.appendFileSync('.env.production', cocktailVariable);
    fs.appendFileSync('.env.production', nonAlcoholVariable);

    console.log('.env file created successfully.');
}

function mapToJSON(response) {
    const mappedData = response.data.values.map(row => ({
        name: row[0],
        description: row[1],
        price: row[2]
    }));

    return {list: mappedData}
}

fetchEnv().catch(console.error);
