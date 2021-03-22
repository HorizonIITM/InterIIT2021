import React, { Fragment, useState, useEffect } from 'react'
import Globe from 'react-globe.gl';
import * as THREE from "three";
import Star from '../components/Star'
import ReactDOM from 'react-dom';
import { PDFDownloadLink, Document, Page, Text } from '@react-pdf/renderer'
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const myData = [{name: 'l0', lat: 11.2099664, lng: 33.021388888888886},
{name: 'l1', lat: 64.6245634, lng: 32.79},
{name: 'l2', lat: 78.5274956, lng: -40.04361111111111},
{name: 'l3', lat: 80.1216472, lng: -71.96000000000001},
{name: 'l4', lat: 83.1783048, lng: -69.43833333333333},
{name: 'l5', lat: 94.2804118, lng: 9.136944444444444},
{name: 'l6', lat: 95.685387, lng: 0.0},
{name: 'l7', lat: 104.612482, lng: -7.263888888888889},
{name: 'l8', lat: 117.1408108, lng: -67.7525},
{name: 'l9', lat: 128.983296, lng: 51.309999999999995},
{name: 'l10', lat: 129.345818, lng: -42.88583333333333},
{name: 'l11', lat: 140.1116488, lng: -55.20666666666667},
{name: 'l12', lat: 140.6445602, lng: -63.294999999999995},
{name: 'l13', lat: 153.399976, lng: -45.07638888888889},
{name: 'l14', lat: 169.5452011, lng: 48.03691666666666},
{name: 'l15', lat: 171.6112322, lng: -68.67583333333334},
{name: 'l16', lat: 194.4049752, lng: -69.28916666666666},
{name: 'l17', lat: 201.6503926, lng: -62.13611111111111},
{name: 'l18', lat: 209.5404102, lng: -64.73472222222222},
{name: 'l19', lat: 224.591652, lng: -31.66888888888889},
{name: 'l20', lat: 230.1703894, lng: -57.16694444444444},
{name: 'l21', lat: 232.0716552, lng: -61.882777777777775},
{name: 'l22', lat: 236.7858276, lng: -47.669444444444444},
{name: 'l23', lat: 236.9782968, lng: -62.56805555555556},
{name: 'l24', lat: 237.74487748, lng: -56.47638888888889},
{name: 'l25', lat: 240.2595818, lng: -60.738055555555555},
{name: 'l26', lat: 241.4408028, lng: 25.8625},
{name: 'l27', lat: 240.974964, lng: -77.885},
{name: 'l28', lat: 243.179138, lng: -52.42305555555555},
{name: 'l29', lat: 244.9795466, lng: -15.640277777777778},
{name: 'l30', lat: 247.0099984, lng: -49.19027777777777},
{name: 'l31', lat: 248.0699888, lng: -67.46194444444444},
{name: 'l32', lat: 248.5016664, lng: -47.39416666666666},
{name: 'l33', lat: 249.116648, lng: -47.82694444444445},
{name: 'l34', lat: 250.231213, lng: -53.75138888888889},
{name: 'l35', lat: 251.4487182, lng: -45.611111111111114},
{name: 'l36', lat: 253.500570742, lng: -39.84580555555556},
{name: 'l37', lat: 254.4574668, lng: 35.3425},
{name: 'l38', lat: 255.5262458, lng: -29.945833333333333},
{name: 'l39', lat: 255.706217, lng: -48.78972222222222},
{name: 'l40', lat: 256.435387, lng: -36.422777777777775},
{name: 'l41', lat: 256.5637398, lng: -43.03611111111111},
{name: 'l42', lat: 256.6441436, lng: 23.971666666666664},
{name: 'l43', lat: 257.0608236, lng: -25.091388888888886},
{name: 'l44', lat: 257.2278802, lng: -44.10055555555556},
{name: 'l45', lat: 258.095818, lng: -40.843333333333334},
{name: 'l46', lat: 257.3758132, lng: -26.6575},
{name: 'l47', lat: 257.5512418, lng: -28.131666666666668},
{name: 'l48', lat: 258.5799872, lng: -34.04944444444444},
{name: 'l49', lat: 258.141644, lng: -37.64333333333333},
{name: 'l50', lat: 259.6974684, lng: -32.17777777777778},
{name: 'l51', lat: 259.9037254, lng: -25.0175},
{name: 'l52', lat: 259.60052558, lng: -40.49177777777778},
{name: 'l53', lat: 260.908308, lng: -37.66166666666666},
{name: 'l54', lat: 261.912474, lng: -35.73444444444444},
{name: 'l55', lat: 261.8883112, lng: -30.801944444444445},
{name: 'l56', lat: 262.9891284, lng: -33.834722222222226},
{name: 'l57', lat: 262.9341372, lng: -16.961666666666666},
{name: 'l58', lat: 263.0091652, lng: -24.745555555555555},
{name: 'l59', lat: 263.383312, lng: -31.216666666666665},
{name: 'l60', lat: 263.3504006, lng: -33.38777777777778},
{name: 'l61', lat: 263.487462, lng: -22.03527777777778},
{name: 'l62', lat: 263.554158, lng: -26.085833333333333},
{name: 'l63', lat: 263.9483016, lng: -30.48222222222222},
{name: 'l64', lat: 264.008332, lng: -27.425833333333333},
{name: 'l65', lat: 264.35415, lng: -29.18},
{name: 'l66', lat: 264.566656, lng: -27.004444444444445},
{name: 'l67', lat: 264.7428778, lng: -44.45},
{name: 'l68', lat: 264.641644, lng: -28.483333333333334},
{name: 'l69', lat: 264.887478, lng: -29.723888888888887},
{name: 'l70', lat: 264.983296, lng: -30.983333333333334},
{name: 'l71', lat: 265.237462, lng: -28.310000000000002},
{name: 'l72', lat: 265.654142, lng: -27.783055555555556},
{name: 'l73', lat: 265.683304, lng: -30.514166666666668},
{name: 'l74', lat: 265.945802, lng: -29.433333333333334},
{name: 'l75', lat: 265.9778802, lng: -29.74527777777778},
{name: 'l76', lat: 266.1058164, lng: -29.0125},
{name: 'l77', lat: 266.204134, lng: -29.351666666666667},
{name: 'l78', lat: 266.258332, lng: -32.227222222222224},
{name: 'l79', lat: 266.254166, lng: -28.901666666666664},
{name: 'l80', lat: 266.370814, lng: -32.69416666666666},
{name: 'l81', lat: 266.3608156, lng: -28.983333333333334},
{name: 'l82', lat: 266.404142, lng: -29.45},
{name: 'l83', lat: 266.404142, lng: -29.01861111111111},
{name: 'l84', lat: 266.4195562, lng: -29.003055555555555},
{name: 'l85', lat: 266.4287214, lng: -28.781388888888888},
{name: 'l86', lat: 266.4703814, lng: -29.05611111111111},
{name: 'l87', lat: 266.5, lng: -28.91361111111111},
{name: 'l88', lat: 266.5204134, lng: -28.886944444444445},
{name: 'l89', lat: 266.5258292, lng: -29.51833333333333},
{name: 'l90', lat: 266.5404102, lng: -28.851111111111113},
{name: 'l91', lat: 266.5799872, lng: -28.735277777777778},
{name: 'l92', lat: 266.581237, lng: -28.89527777777778},
{name: 'l93', lat: 266.695802, lng: -28.89472222222222},
{name: 'l94', lat: 266.8570662, lng: -29.99527777777778},
{name: 'l95', lat: 266.1378946, lng: -28.74138888888889},
{name: 'l96', lat: 266.8578994, lng: -30.041944444444447},
{name: 'l97', lat: 266.983296, lng: -26.56361111111111},
{name: 'l98', lat: 267.0558244, lng: -36.13138888888889},
{name: 'l99', lat: 266.399976, lng: -29.02611111111111},
{name: 'l100', lat: 267.233296, lng: -24.894444444444446},
{name: 'l101', lat: 267.222881, lng: -20.36722222222222},
{name: 'l102', lat: 267.4607996, lng: -33.198611111111106},
{name: 'l103', lat: 267.514581, lng: -32.42861111111111},
{name: 'l104', lat: 267.5529082, lng: -37.05222222222222},
{name: 'l105', lat: 267.6070662, lng: -21.4225},
{name: 'l106', lat: 267.689553, lng: -31.292222222222225},
{name: 'l107', lat: 267.02107996, lng: -28.47383333333333},
{name: 'l108', lat: 267.2224644, lng: -20.361944444444447},
{name: 'l109', lat: 268.066656, lng: -28.50611111111111},
{name: 'l110', lat: 267.599984, lng: -29.038333333333334},
{name: 'l111', lat: 268.099984, lng: -31.628333333333334},
{name: 'l112', lat: 269.66664, lng: -33.8075},
{name: 'l113', lat: 268.8691476, lng: -32.4775},
{name: 'l114', lat: 270.2841612, lng: -25.079166666666666},
{name: 'l115', lat: 270.3029082, lng: -25.740555555555556},
{name: 'l116', lat: 270.3845618, lng: -20.528888888888886},
{name: 'l117', lat: 271.7091332, lng: -24.5875},
{name: 'l118', lat: 271.712466, lng: -24.584999999999997},
{name: 'l119', lat: 272.11473164, lng: -36.978972222222225},
{name: 'l120', lat: 272.685387, lng: -26.150277777777777},
{name: 'l121', lat: 273.6295626, lng: -17.15722222222222},
{name: 'l122', lat: 273.799992, lng: -12.083333333333334},
{name: 'l123', lat: 274.0058324, lng: -14.036388888888888},
{name: 'l124', lat: 274.83948568, lng: -25.42666666666667},
{name: 'l125', lat: 275.9191396, lng: -30.36138888888889},
{name: 'l126', lat: 276.4449688, lng: -37.10527777777778},
{name: 'l127', lat: 276.3420686, lng: 0.0},
{name: 'l128', lat: 277.362482, lng: -23.79138888888889},
{name: 'l129', lat: 278.933304, lng: -32.981944444444444},
{name: 'l130', lat: 279.989545, lng: 5.035833333333334},
{name: 'l131', lat: 282.3212386, lng: -3.062222222222222},
{name: 'l132', lat: 283.2704134, lng: -8.705555555555556},
{name: 'l133', lat: 284.162474, lng: 5.33},
{name: 'l134', lat: 284.67322228, lng: 22.658166666666666},
{name: 'l135', lat: 287.112482, lng: 0.0},
{name: 'l136', lat: 287.816656, lng: 0.0},
{name: 'l137', lat: 288.820822, lng: 10.968333333333334},
{name: 'l138', lat: 289.699968, lng: -5.235833333333334},
{name: 'l139', lat: 290.070822, lng: 14.694166666666668},
{name: 'l140', lat: 295.658308, lng: -3.9},
{name: 'l141', lat: 299.849984, lng: 11.708333333333332},
{name: 'l142', lat: 300.7066336, lng: 25.236666666666668},
{name: 'l143', lat: 303.1574748, lng: 38.183638888888886},
{name: 'l144', lat: 306.0158308, lng: 33.867777777777775},
{name: 'l145', lat: 320.81057364, lng: -5.798027777777778},
{name: 'l146', lat: 322.4928778, lng: 12.167499999999999},
{name: 'l147', lat: 322.8591492, lng: 47.29},
{name: 'l148', lat: 326.1716392, lng: 38.32166666666667},
{name: 'l149', lat: 350.1420606, lng: 62.2925}]


const polygonsMaterial = new THREE.MeshLambertMaterial({ color: 'darkslategrey', side: THREE.DoubleSide });

const documents = myData.map(point => {
    const doc  =  <Document>
    <Page>
        <Text>
    lat: {point.lat}
      long: {point.long}
      name: {point.name}
      </Text>
    </Page>
  </Document> 
   return{ name:point.name, doc: doc}
        
   }
      
)

function MyGlobe() {

    const [point, setPoint] = useState(null)

    
    return (
        <div>
              <Globe
    pointsData={myData}
    showGlobe={false}
    showAtmosphere={false}
    showGraticules = {true}
    pointResolution = {12}
    // pointLabel = {<div>hey</div>}
    labelSize = {12}
    pointAltitude = {0}
    pointRadius = {0.4}
    // polygonsData={landPolygons}
    polygonCapMaterial={polygonsMaterial}
    polygonSideColor={() => 'rgba(0, 0, 0, 0)'}
    onPointHover = {(point, prevPoint) => {
        console.log(point, prevPoint, "clicked!!")
       }
       }

       onPointClick = {(point, prevPoint) =>
        
        {setPoint(point||prevPoint)
            
    //         ReactDOM.render(
    //     <React.StrictMode>
    //       <Star point = {point || prevPoint}/>
    //     </React.StrictMode>,
    //     document.getElementById('root2')
    //   )

      console.log(point, prevPoint)
    
    }}
  />


  <Fragment>
      
         
     {
         point &&  <Star point = {point}/>
     }
     {
         point &&  console.log(documents.filter(document => document.name ===  point.name )[0])
     }
     {
         point && <PDFDownloadLink document={documents.filter(document => document.name ===  point.name )[0].doc} fileName={`${point.name}.pdf`}>
         {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
       </PDFDownloadLink>
     }
      
  </Fragment>


            
        </div>
    )
}

export default MyGlobe
