import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Navbar from '../components/Navbar'

describe('Navbar', () => {
    it('renders a Link that redirect to homepage with title: EcoPortal', () => {
        render(<Navbar />)

        const heading = screen.getByRole('link', { name: 'EcoPortal' })

        expect(heading).toBeInTheDocument()
    })
})
