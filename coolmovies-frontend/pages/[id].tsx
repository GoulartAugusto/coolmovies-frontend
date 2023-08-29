import { useRouter } from 'next/router'
 
export default function Page() {
  const router = useRouter()
  return <p>Movie: {router.query.id}</p>
}