import NextLink from "next/link";
import axios from "axios";
import { Button, ButtonGroup, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import Link from "next/link";
import { useRouter } from "next/router";

//fetch with "getServerSideProps"
export async function getServerSideProps() {

    //http request
    const req = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/posts`)
    const res = await req.data.data.data

    return {
        props: {
            posts: res // <-- assign response
        },
    }
}

function PostIndex(props) {

    //destruct
    const { posts } = props;

    //router
    const router = useRouter();

    //refresh data
    const refreshData = () => {
        router.replace(router.asPath);
    }

    //function "deletePost"
    const deletePost = async (id) => {

        //sending
        await axios.delete(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/posts/${id}`);

        //refresh data
        refreshData();

    }

    return (
        <TableContainer>
            <Table variant='simple'>
                <TableCaption>Imperial to metric conversion factors</TableCaption>
                <Thead>
                <Tr>
                    <Th>No</Th>
                    <Th>Title</Th>
                    <Th>Thumbnail</Th>
                    <Th>Action</Th>
                </Tr>
                </Thead>
                <Tbody>
                {posts.map((post, key) => (
                    <tr key={key+1}>
                        <td>{key+1}</td>
                        <td>{post.title}</td>
                        <td className="text-center">
                            <img src={`${process.env.NEXT_PUBLIC_API_BACKEND}/storage/${post.thumbnail}`} width="150" className="rounded-3" />
                        </td>
                        <td className="text-center">
                            <ButtonGroup>
                                <Link href={`/posts/show/${post.id}`}>
                                    <Button colorScheme='blue'>SHOW</Button>
                                </Link>
                                <Link href={`/posts/edit/${post.id}`}>
                                    <Button colorScheme='yellow'>EDIT</Button>
                                </Link>
                                <Button onClick={() => deletePost(post.id)} colorScheme='red'>DELETE</Button>
                            </ButtonGroup>
                        </td>
                    </tr>
                ))}
                </Tbody>
            </Table>
        </TableContainer>
    )
}

export default PostIndex
