import React, { useState } from 'react'
import { useFetch } from '../hooks/useFetch'
import { Button, Form, Card, Alert } from 'react-bootstrap'

const REV_GEOCODE_URL = "https://revgeocode.search.hereapi.com/v1/revgeocode";

interface Params {
    latitude: string,
    longitude: string
}

export function getRevGeoCode(params: Params) {
    const {latitude, longitude} = params
    //TODO: Will throw error if REACT_APP_API_KEY doesn't exist. What could we do?
    return fetch(`${REV_GEOCODE_URL}?at=${latitude},${longitude}&apiKey=${process.env.REACT_APP_API_KEY}`)
        .then(response => response.json())
        //TODO: First response..
        // How can we handle this? What if error?
        .then(response => response.items[0])
}

export function ReverseGeoCodingForm(): JSX.Element {
    const [latitude, setLatitude] = useState<string>('')
    const [longitude, setLongitude] = useState<string>('')
    const [rGeoCodingResult, rGeoCodingCall] = useFetch(getRevGeoCode, {
        latitude, longitude
    })


    function onSubmit() {
        if (latitude !== '' && longitude !== '') {
            rGeoCodingCall()
        }
    }

    return (
        <Card style={{ width: '18rem', margin: '0 auto' }}>
            <Form>
                <Form.Group controlId="latitude">
                    <Form.Label>Latitude</Form.Label>
                    <Form.Control type="text" placeholder="e.g. 51.12" value={latitude} onChange={e => setLatitude(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="longitude">
                    <Form.Label>Longitude</Form.Label>
                    <Form.Control type="text" placeholder="e.g. 12.132" value={longitude} onChange={e => setLongitude(e.target.value)} />
                </Form.Group>

                <Button variant="primary" onClick={() => onSubmit()}>
                    Submit
                </Button>
            </Form>
            <Alert variant={'info'}>
                {rGeoCodingResult !== null ? rGeoCodingResult.title : null}
            </Alert>
        </Card>
    )
}
