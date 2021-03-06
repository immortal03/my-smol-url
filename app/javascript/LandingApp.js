import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ApolloProvider } from "@apollo/client"
import client from "./graphql/client"
import Layout from "./components/Layout"
import MainPage from "./pages/landing/MainPage"
import NotFoundPage from "./pages/landing/NotFoundPage"
import AnalyticsIndexPage from "./pages/analytics/AnalyticsIndexPage"
import LinkAnalyticsPage from "./pages/analytics/LinkAnalyticsPage"

const LandingApp = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<MainPage />} exact />
            <Route path="/:slug" element={<NotFoundPage />} />
            <Route path="/analytics" element={<AnalyticsIndexPage />} exact />
            <Route path="/analytics/:slug" element={<LinkAnalyticsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ApolloProvider>
  )
}

export default LandingApp
