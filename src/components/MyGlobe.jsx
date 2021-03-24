import React, {useState, useEffect, useRef} from 'react';
import Globe from 'react-globe.gl';
import {
  Document,
  Page,
  PDFDownloadLink,
  Text,
  StyleSheet,
  View,
} from '@react-pdf/renderer';
import CardComp from './Card/CardComp';
import Star from './Star';
import {Row, Col, Layout, Typography, Button, Checkbox} from 'antd';
import 'antd/dist/antd.css';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import jsonData from '../data/output.json';

const {Header, Footer, Sider, Content} = Layout;
const {Title} = Typography;

const updatedJsonData = jsonData.map((point) => {
  const updatedType = point.Type.replace('(', '')
    .replace(')', '')
    .replace('?', '')
    .split(',')
    .map((char) => {
      switch (char) {
        case 'P':
          return 'X-ray pulsars';
        case 'T':
          return 'transient X-ray source';
        case 'U':
          return 'Ultra-soft X-ray spectrum';
        case 'V':
          return 'variable';
        case 'A':
          return 'atoll source';
        case 'B':
          return 'X-ray burst source';
        case 'D':
          return 'dipping low-mass X-ray binary';
        case 'G':
          return 'globular-cluster X-ray source';
        case 'Z':
          return 'Z-type';
        default:
          return '';
      }
    });
  const updatedCat = point.Cat.replace('(', '')
    .replace(')', '')
    .replace('?', '')
    .split(',')
    .map((char) => {
      switch (char) {
        case 'A':
          return 'Ariel V sky survey';
        case 'AS':
          return 'ASCA';
        case 'B':
          return 'BeppoSAX';
        case 'C':
          return ' Compton {gamma}-ray Observatory';
        case 'E':
          return 'Einstein Observatory';
        case 'Exo':
          return 'Exosat';
        case 'G':
          return ' Ginga';
        case 'Gr':
          return 'Granat';
        case 'H':
          return 'HEAO A-1 sky survey';
        case 'Ha':
          return 'Hakucho';
        case 'I':
          return 'Indian X-ray Astronomy Experiment (IXAE)';
        case 'K':
          return 'Kvant';
        case 'M':
          return 'Mit OSO-7 sky survey';
        case 'OAO':
          return 'Orbiting Astronomical Observatory';
        case 'R':
          return 'ROSAT';
        case 'S':
          return 'SAS 3';
        case 'SL':
          return 'Space Lab';
        case 'T':
          return 'Tenma';
        case 'U':
          return 'Uhuru sky survey';
        case 'V':
          return 'Vela-5 and -6 satellites';
        case 'X':
          return 'Rossi XTE';
        // case '':
        //   return ''
        default:
          return '';
      }
    });

  const updatedPos = point.Pos.replace('(', '')
    .replace(')', '')
    .replace('?', '')
    .split(',')
    .map((char) => {
      switch (char) {
        case 'o':
          return 'optical';
        case 'x':
          return 'X-ray';
        case 'r':
          return 'radio';
        case 'IR':
          return 'infrared';
        default:
          return '';
      }
    });

  return {...point, Cat: updatedCat, Pos: updatedPos, Type: updatedType};
});

const styles = StyleSheet.create({
  page: {backgroundColor: 'white', padding: 10, flex: 1},
  section: {color: 'white', textAlign: 'center', margin: 30},
  title: {
    color: 'blue',
    textAlign: 'center',
    margin: 30,
    fontSize: 40,
  },
  row: {
    color: 'black',
    margin: 5,
    marginHorizontal: 20,
    borderWidth: 1,
    padding: 5,
    borderRadius: 10,
  },
  value: {
    color: 'grey',
    marginLeft: 30,
  },
});

const documents = updatedJsonData.map((point) => {
  const doc = (
    <Document>
      <Page style={styles.page}>
        <View style={{borderWidth: 2, flex: 1}}>
          <Text style={styles.title}>{point.Name}</Text>

          <Text style={styles.row}>
            Latitude: <Text style={styles.value}>{point.lat}</Text>
          </Text>
          <Text style={styles.row}>
            Longitude: <Text style={styles.value}>{point.lng}</Text>
          </Text>
          <Text style={styles.row}>
            RA:{' '}
            <Text style={styles.value}>
              {point.RAh}h {point.RAm}m {point.RAs}s
            </Text>
          </Text>
          <Text style={styles.row}>
            DEC:{' '}
            <Text style={styles.value}>
              {point['DE-']}
              {point.DEd}d {point.DEm}m {point.DEs}s
            </Text>
          </Text>
          <Text style={styles.row}>
            Observed by AstroSat:{' '}
            <Text style={styles.value}>{point.isObserved ? 'Yes' : 'No'}</Text>
          </Text>
          <Text style={styles.row}>
            Galactic Latitude: <Text style={styles.value}>{point.GLAT}</Text>
          </Text>
          <Text style={styles.row}>
            Galactic Longitude: <Text style={styles.value}>{point.GLON}</Text>
          </Text>
          <Text style={styles.row}>
            AstroSat Publication:{' '}
            <Text style={styles.value}>{point.isReferred ? 'Yes' : 'No'}</Text>
          </Text>
          <Text style={styles.row}>
            VMag : <Text style={styles.value}>{point.Vmag}</Text>
          </Text>
          <Text style={styles.row}>
            B-V: <Text style={styles.value}>{point['B-V']}</Text>
          </Text>
          <Text style={styles.row}>
            Flux Energy Range : <Text style={styles.value}>{point.Range}</Text>
          </Text>
          <Text style={styles.row}>
            Source Position :{' '}
            <Text style={styles.value}>{point.Pos.join(', ')}</Text>
          </Text>
          <Text style={styles.row}>
            Survey Catalogue:{' '}
            <Text style={styles.value}>{point.Cat.join(', ')}</Text>
          </Text>
          <Text style={styles.row}>
            Type: <Text style={styles.value}>{point.Type.join(', ')}</Text>
          </Text>
          <Text style={styles.row}>
            Identifier:{' '}
            <Text style={styles.value}>
              {point.identifiers.length === 0 ? 'Dont Have' : point.identifiers}
            </Text>
          </Text>
          <Text style={styles.row}>
            Publications:{' '}
            <Text style={styles.value}>
              {point.references.length === 0 ? 'Dont Have' : point.identifiers}
            </Text>
          </Text>
        </View>
      </Page>
    </Document>
  );
  return {name: point.name, doc: doc};
});

const MyGlobe = () => {
  const globeEl = useRef();
  const [observedPoints, setobservedPoints] = useState(
    updatedJsonData.filter((point) => point.isObserved === true),
  );
  const [notObservedPoints, setNotObservedPoints] = useState(
    updatedJsonData.filter((point) => point.isObserved === false),
  );
  const [point, setPoint] = useState(null);
  const [onSelect, setOnSelect] = useState(false);
  const [prevPoint, setPrevPoint] = useState(null);
  const [data, setData] = useState(updatedJsonData);
  const screen = useBreakpoint();

  console.log(Globe, 'dfghjh');

  useEffect(() => {
    globeEl.current.pointOfView({lat: 39.6, lng: -98.5, altitude: 2});
  }, []);

  return (
    <Layout>
      <Header
        style={{height: window.innerHeight * 0.1, justifyContent: 'center'}}>
        <Title
          style={{
            color: 'white',
            marginTop: 20,
          }}>
          AstroSat{' '}
        </Title>
      </Header>
      <Layout>
        <Content>
          <Globe
            ref={globeEl}
            pointsData={data}
            enablePointerInteraction={true}
            labelLabel={<Title>Something</Title>}
            // hexBinPointsData={data}
            height={window.innerHeight * 0.9}
            width={window.innerWidth * 0.75}
            showGlobe={false}
            showAtmosphere={false}
            showGraticules={true}
            pointResolution={12}
            labelSize={0.5}
            pointLabel={(d) => d.Name}
            pointAltitude={0.015}
            pointRadius={0.4}
            pointColor={(d) => {
              // console.log(d)

              return d.isObserved ? '#e73636' : '#ffff00';
            }}
            pointsMerge={false}
            hexBinPointWeight={0}
            // hexSideColor={d => {
            //   // console.log(d)
            //  return d.points[0].isObserved ? '#e73636' : '#000000' }}
            onPointHover={(point, prevPoint) => {
              setOnSelect(true);
              setPoint(point || prevPoint);
            }}
            onPointClick={(point, event) => {
              setPrevPoint(point);
              console.log(event);
            }}
          />
        </Content>
        <Sider
          width={window.innerWidth * 0.25}
          theme="light"
          style={{padding: 20}}>
          {/* <Row>
            <Button onClick={() => setData(observedPoints)}>
              Show only observed points
            </Button>
          </Row>
          <Row>
            <Button onClick={() => setData(updatedJsonData)}>
              Show all points
            </Button>
          </Row> */}

          <Row
            style={{
              height: window.innerHeight * 0.2,
              width: window.innerWidth * 0.23,
            }}>
            <Col>
              <Row justify="center">
                <Title level={4}>INTER-IIT TECH MEET 9.0</Title>
              </Row>
              <Row justify="center">
                <Title level={4}>ISRO'S</Title>
              </Row>
              <Row justify="center">
                <Title level={5}>
                  WEB BASED VISUALIZATION TOOL FOR ASTROSAT OBSERVATIONS
                </Title>
              </Row>
            </Col>
          </Row>

          <Row>
            <Checkbox.Group
              options={[
                {label: 'Observed', value: 'Observed'},
                {label: 'Not Observed', value: 'Not Observed'},
              ]}
              defaultValue={['Observed', 'Not Observed']}
              onChange={(value) => {
                console.log(value);
                switch (JSON.stringify(value)) {
                  case JSON.stringify(['Observed']):
                    setData(observedPoints);
                    break;
                  case JSON.stringify(['Not Observed']):
                    setData(notObservedPoints);
                    break;
                  case JSON.stringify(['Observed', 'Not Observed']) ||
                    JSON.stringify(['Not Observed', 'Observed']):
                    setData(updatedJsonData);
                    break;
                  default:
                    setData(updatedJsonData);
                }
              }}
            />
          </Row>

          <Row
            style={{
              height: window.innerHeight * 0.5,
              width: window.innerWidth * 0.23,
            }}>
            <CardComp
              starData={point}
              isHover={onSelect}
              style={{height: window.innerHeight * 0.4}}
            />
          </Row>

          {console.log(prevPoint, 'prevPoint')}
          {prevPoint && prevPoint.isObserved && (
            <Row
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
                height: 50,
                margin: 20,
                backgroundColor: 'lightgreen',
                borderRadius: 20,
              }}>
              <PDFDownloadLink
                document={
                  documents.filter(
                    (document) => document.Name === prevPoint.name,
                  )[0].doc
                }
                fileName={`${prevPoint['Name']}.pdf`}>
                {({blob, url, loading, error}) =>
                  loading ? 'Loading document...' : 'Download now!'
                }
              </PDFDownloadLink>
            </Row>
          )}
        </Sider>
      </Layout>
      {/* <Footer>Footer</Footer> */}
    </Layout>
  );
};

export default MyGlobe;
