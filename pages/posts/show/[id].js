//import hook useState
import { useState } from 'react';

//import router
import Router from 'next/router';


//import axios
import axios from "axios";
import Image from 'next/image';
import { Heading } from '@chakra-ui/react';

//fetch with "getServerSideProps"
export async function getServerSideProps({ params }) {

    //http request
    const req  = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/posts/${params.id}`)
    const res  = await req.data.data

    return {
      props: {
          post: res // <-- assign response
      },
    }
  }

function PostEdit(props) {

    //destruct
    const { post } = props;

    return (
        <>
             <img src={`${process.env.NEXT_PUBLIC_API_BACKEND}/storage/${post.thumbnail}`} width="100%" className="rounded-3" />
             <Heading as='h3' size='lg' marginY='6'>
                {post.title}
            </Heading>
            <p>
                {post.content}
            </p>
        </>
    );

}

export default PostEdit
