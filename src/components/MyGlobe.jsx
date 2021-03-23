import React, { useState } from "react";
import Globe from "react-globe.gl";
import { Document, Page, PDFDownloadLink, Text } from "@react-pdf/renderer";
import { myData } from "./Data";
import CardComp from "./Card/CardComp";
import Star from "./Star";
import { Row, Col, Layout, Typography } from "antd";
import "antd/dist/antd.css";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";

const { Header, Footer, Sider, Content } = Layout;
const { Title } = Typography


// const polygonsMaterial = new THREE.MeshLambertMaterial({ color: "darkslategrey", side: THREE.DoubleSide });

const documents = myData.map((point) => {
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
  const screen  = useBreakpoint()
  
  
	return (
		<Layout>
			<Header ><Title style  = {{color : 'white' , alignItems : "center"}} >AstroSat </Title></Header>
			<Layout>
				<Content>
					<Globe
						pointsData={myData}
						height={window.innerHeight}
						width={window.innerWidth * 0.75}
						showGlobe={false}
						showAtmosphere={false}
						showGraticules={true}
						pointResolution={12}
						labelSize={12}
						pointAltitude={0}
						pointRadius={1}
						pointsMerge={false}
						onPointHover={(point, prevPoint) => {
							setOnSelect(true);
							setPoint(point);
						}}
						onPointClick={(point, prevPoint) => {
							setPrevPoint(point || prevPoint);
							console.log(point, prevPoint);
						}}
					/>
				</Content>
				<Sider width={window.innerWidth * 0.25} theme='light' style={{ padding: 20 }}>
					<Col>
						<Row style={{ height: window.innerHeight * 0.8 , width: window.innerWidth * 0.23 }}>
							<CardComp starData={point} isHover={onSelect} />
						</Row>
            {prevPoint && (
						<Row style={{ justifyContent: "center", alignItems: "center", display: "flex", height: 50, margin: 20, backgroundColor: "lightgreen", borderRadius: 20 }}>
							{/* {prevPoint && <Star point={prevPoint} />} */}
							{/* {prevPoint && console.log(documents.filter((document) => document.name === prevPoint.name)[0])} */}
							
								<PDFDownloadLink document={documents.filter((document) => document.name === prevPoint.name)[0].doc} fileName={`${prevPoint.name}.pdf`}>
									{({ blob, url, loading, error }) => (loading ? "Loading document..." : "Download now!")}
								</PDFDownloadLink>
							
						</Row>
            )}
					</Col>
				</Sider>
			</Layout>
			<Footer>Footer</Footer>
		</Layout>
	);
};

export default MyGlobe;
