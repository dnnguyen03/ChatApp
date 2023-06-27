import { useContext, useEffect, useMemo, useState } from "react"
import {
  collection,
  doc,
  getDocs,
  limit,
  query,
  updateDoc,
  where,
} from "firebase/firestore"
import { db } from "../../firebase/config"
import { AppContext } from "../ConText/AppProvider"

import { Avatar, Form, Modal, Select, Spin } from "antd"
import { debounce } from "lodash"
import { Stack, Typography } from "@mui/material"

function DebounceSelect({
  fetchOption,
  debounceTimeout = 300,
  curMembers,
  ...props
}) {
  const [options, setOption] = useState([])
  const [fetching, setFetching] = useState(false)
  const debounceFetch = useMemo(() => {
    const loadOption = (value) => {
      setOption([])
      setFetching(false)
      fetchOption(value, curMembers).then((newOption) => {
        setOption(newOption)
        setFetching(false)
      })
    }
    return debounce(loadOption, debounceTimeout)
  }, [debounceTimeout, fetchOption, curMembers])

  //Clear when unmount
  useEffect(() => {
    return () => {
      setOption([])
    }
  }, [])
  return (
    <Select
      labelInValue
      filterOption={false}
      onSearch={debounceFetch}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      optionLabelProp="children"
      {...props}
    >
      {options.map((opt) => {
        return (
          <Select.Option key={opt.value} value={opt.value} label={opt.label}>
            <Avatar size="small" src={opt.photoURL}>
              {opt.photoURL ? "" : opt.label?.charAt(0)?.toUpperCase()}
            </Avatar>
            {` ${opt.label}`}
          </Select.Option>
        )
      })}
    </Select>
  )
}

async function fetchUserList(search, curMembers) {
  const usersRef = collection(db, "users")
  const q = query(
    usersRef,
    where("keywords", "array-contains", search.toLowerCase()),
    limit(5)
  )
  const snapshot = await getDocs(q)
  return snapshot.docs
    .map((doc) => ({
      label: doc.data().displayName,
      value: doc.data().uid,
      photoURL: doc.data().photoURL,
    }))
    .filter((opt) => !curMembers.includes(opt.value))
}

export default function InviteMemberModal() {
  const {
    inviteMemberVisible,
    setInviteMemberVisible,
    selectedRoomId,
    selectedRoom,
  } = useContext(AppContext)

  const [value, setValue] = useState([])
  const [form] = Form.useForm()

  const onSubmit = () => {
    form.resetFields()
    setValue([])

    const roomRef = doc(collection(db, "rooms"), selectedRoomId)
    updateDoc(roomRef, {
      members: [...selectedRoom.members, ...value.map((value) => value.key)],
    })

    setInviteMemberVisible(false)
  }
  const handleCancel = () => {
    // reset form value
    form.resetFields()
    setValue([])

    setInviteMemberVisible(false)
  }
  return (
    <Modal
      open={inviteMemberVisible}
      onCancel={handleCancel}
      onOk={onSubmit}
      destroyOnClose={true}
    >
      <Typography textAlign="center" variant="h5">
        Add members
      </Typography>

      <Stack>
        <Form form={form} layout="vertical">
          <DebounceSelect
            mode="multiple"
            name="search-user"
            fetchOption={fetchUserList}
            style={{ width: "100%" }}
            label="List member"
            placeholder="Search name"
            onChange={(newValue) => setValue(newValue)}
            curMembers={selectedRoom.members}
          />
        </Form>
      </Stack>
      <Stack width="fit-content" ml="auto" mt={3}></Stack>
    </Modal>
  )
}
