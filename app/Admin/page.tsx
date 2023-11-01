import { getTestsName } from "@/lib/data"
import {AdminTestsGrid} from "../components/testsGrid"

const Admin =async()=>{
    const tests = await getTestsName()
    console.log(tests);
    

    return(
        <>
        <h1>tests</h1>
        <AdminTestsGrid tests={tests}/>
        </>
    )
}
export default Admin