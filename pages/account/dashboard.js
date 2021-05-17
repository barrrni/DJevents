import Layout from 'components/Layout'
import DashboardEvent from 'components/DashboardEvent'
import { API_URL } from '@/config/index'
import { parseCookies } from '@/helpers/index'
import styles from '@/styles/Dashboard.module.css'

const dashboardPage = ({ events }) => {

    const deleteEvent = (id) => {
        console.log(id)
    }

    return (
        <Layout title='User dashboard'>
            <div className={styles.dash}>
                <h1>Dashboard</h1>
                <h3>My Events</h3>

                {events.map((evt) => (
                    <DashboardEvent key={evt.id} evt={evt} handleDelete={deleteEvent} />
                ))}
            </div>
        </Layout>
    )
}

export async function getServerSideProps({ req }) {
    const { token } = parseCookies(req)

    const res = await fetch(`${API_URL}/events/me`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    const events = await res.json()

    return {
        props: { events },
    }
}

export default dashboardPage