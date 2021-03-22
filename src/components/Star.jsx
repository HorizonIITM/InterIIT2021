import React from 'react'
import { PDFDownloadLink, Document, Page, Text } from '@react-pdf/renderer'

function Star(props) {
    const {point} = props
    console.log(props, "props")
    const MyDoc = () => (
        <Document>
          <Page>
              <Text>
          lat: {point.lat}
            long: {point.long}
            name: {point.name}
            </Text>
          </Page>
        </Document>
      )
    return (
        <div>
            lat: {point.lat}
            long: {point.long}
            name: {point.name}

            {/* <PDFDownloadLink document={<MyDoc />} fileName={`${point.name}.pdf`}>
      {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
    </PDFDownloadLink> */}
        </div>

        
    )
}

export default Star
