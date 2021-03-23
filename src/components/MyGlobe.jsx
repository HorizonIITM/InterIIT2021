import React, { useState } from "react";
import Globe from "react-globe.gl";
import { Document, Page, PDFDownloadLink, Text } from "@react-pdf/renderer";
import { myData } from "./Data";
import CardComp from "./Card/CardComp";
import Star from "./Star";
import { Row, Col, Layout } from "antd";
import "antd/dist/antd.css";

const { Header, Footer, Sider, Content } = Layout;

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

	return (
		<Layout>
			<Header>AstroSat</Header>
			<Layout>
				<Content>
					<Globe
						pointsData={myData}
						height={700}
						width={1300}
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
				<Sider width={520} theme='light' style={{ padding: 20 }}>
					<Col>
						<Row style={{ height: 600, width: 500 }}>
							<CardComp starData={point} isHover={onSelect} />
						</Row>
						<Row style={{ justifyContent: "center", alignItems: "center", display: "flex", height: 50, margin: 20, backgroundColor: "lightgreen", borderRadius: 20 }}>
							{/* {prevPoint && <Star point={prevPoint} />} */}
							{/* {prevPoint && console.log(documents.filter((document) => document.name === prevPoint.name)[0])} */}
							{prevPoint && (
								<PDFDownloadLink document={documents.filter((document) => document.name === prevPoint.name)[0].doc} fileName={`${prevPoint.name}.pdf`}>
									{({ blob, url, loading, error }) => (loading ? "Loading document..." : "Download now!")}
								</PDFDownloadLink>
							)}
						</Row>
					</Col>
				</Sider>
			</Layout>
			<Footer>Footer</Footer>
		</Layout>
	);
};

export default MyGlobe;
