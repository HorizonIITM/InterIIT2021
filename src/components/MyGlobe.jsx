import React, { useState, useEffect } from "react";
import Globe from "react-globe.gl";
import { Document, Page, PDFDownloadLink, Text } from "@react-pdf/renderer";
import CardComp from "./Card/CardComp";
import Star from "./Star";
import { Row, Col, Layout, Typography } from "antd";
import "antd/dist/antd.css";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import jsonData from '../data/output.json'


const { Header, Footer, Sider, Content } = Layout;
const { Title } = Typography
const documents = jsonData.map((point) => {
	const doc = (
		<Document>
			<Page>
				<Text>
					lat: {point.lat}
					long: {point.long}
					name: {point.name}
				</Text>
			</Page>
		</Document>
	);
	return { name: point.name, doc: doc };
});

const MyGlobe = () => {
	const [point, setPoint] = useState(null);
	const [onSelect, setOnSelect] = useState(false);
	const [prevPoint, setPrevPoint] = useState(null);
  const [data, setData] = useState(jsonData)
  const screen  = useBreakpoint()

	console.log(jsonData[0].isObserved)
  
	return (
		<Layout>
			<Header style ={{ height: window.innerHeight * 0.1}} ><Title style  = {{color : 'white' , alignItems : "center"}} >AstroSat </Title></Header>
			<Layout>
				<Content>
					<Globe
						pointsData={data}
						height={window.innerHeight * 0.9}
						width={window.innerWidth * 0.75}
						showGlobe={false}
						showAtmosphere={false}
						showGraticules={true}
						pointResolution={12}
						labelSize={12}
						pointAltitude={0.015}
						pointRadius={0.4}
						pointsMerge={false}
						onPointHover={(point, prevPoint) => {
							setOnSelect(true);
							setPoint(point);
						}}
						onPointClick={(point, prevPoint) => {
							setPrevPoint( prevPoint);
						}}
					/>
				</Content>
				<Sider width={window.innerWidth * 0.25}  theme='light' style={{ padding: 20 }}>
					<Col>
						<Row style={{ height: window.innerHeight * 0.7 , width: window.innerWidth * 0.23 }}>
							<CardComp starData={point} isHover={onSelect} style = {{ height: window.innerHeight * 0.4}} />
						</Row>
            {prevPoint && prevPoint.isObserved &&  (
						<Row style={{ justifyContent: "center", alignItems: "center", display: "flex", height: 50, margin: 20, backgroundColor: "lightgreen", borderRadius: 20 }}>
								<PDFDownloadLink document={documents.filter((document) => document["Name"] === prevPoint["name"])[0].doc} fileName={`${prevPoint["Name"]}.pdf`}>
									{({ blob, url, loading, error }) => (loading ? "Loading document..." : "Download now!")}
								</PDFDownloadLink>
							
						</Row>
            )}
					</Col>
				</Sider>
			</Layout>
			{/* <Footer>Footer</Footer> */}
		</Layout>
	);
};

export default MyGlobe;
