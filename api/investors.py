from flask import Flask, jsonify,Response
import pandas as pd
import traceback
from flask_cors import CORS  # Import CORS


####constants
_FILE_PATH=''
_FILE_NAME='Data.csv'
_READ_COLS=[0,1,2,3,5,6,7]
_COL_NAMES=['Name','Type','Country','DateAdded','AssetClass','Amount','Currency']

###Creating flask app
app = Flask(__name__)
CORS(app)
path=_FILE_PATH+_FILE_NAME
def getdata(filepath):    
    data=pd.read_csv(filepath,usecols=_READ_COLS, names=_COL_NAMES,  skiprows=1,low_memory=False, encoding='utf8')
    return data

###Get all investor Data
@app.route('/api/investors', methods=['GET'])
def get_investors():
    try:
        inverstors=getdata(path)
        wireframe_investors=inverstors.groupby(['Name','Type','DateAdded','Country'], as_index=False)['Amount'].sum()
        resp =  pd.DataFrame(wireframe_investors).to_json(orient='records') 
        
    except Exception as e:        
        traceback.print_exc()
        print(str(e))
        resp = {"{ \"error\" : \"Failed with the exception\" }":str(e)}, 500
    
    return Response(resp, mimetype='application/json')

###get commitements based on Investor Name
@app.route('/api/investors/<InvestorName>', methods=['GET'])
def get_commitments(InvestorName):
    try:
        investors=getdata('data.csv')
        print(InvestorName)
        commitements=investors[investors['Name']==InvestorName][['Name','AssetClass','Currency','Amount']]
        resp =  pd.DataFrame(commitements).to_json(orient='records')
    except Exception as e:        
        traceback.print_exc()
        print(str(e))
        resp = {"{ \"error\" : \"Failed with the exception\" }":str(e)}, 500       

    return Response(resp, mimetype='application/json')

if __name__ == "__main__":
    app.run()