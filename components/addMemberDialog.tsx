"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { DatePicker } from "./ui/date-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useForm, Controller } from "react-hook-form";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: Date;
  gender: string;
};

const onSubmit = async (data: FormData) => {
  const payload = { ...data, dateOfBirth: data.dateOfBirth ? data.dateOfBirth.toISOString(): null}
  console.log("final payload to DB: ", payload)

   try {
    const res = await fetch("/api/members/create-member", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const error = await res.json();
      console.error("Failed to add member:", error);
      return;
    }

    const member = await res.json();
    console.log("✅ Member created:", member);
  } catch (err) {
    console.error("❌ Error submitting member:", err);
  }
}


export function AddMemberDialog() {
  const { register, handleSubmit, control } = useForm<FormData>();
  return (
    <Dialog>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTrigger asChild>
          <Button variant="outline">Create Member</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Add new Member</DialogTitle>
            <DialogDescription>
              Add details below to add a new member
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-3">
                <Input
                  id="firstName"
                  placeholder="First Name"
                  {...register("firstName")}
                />
              </div>
              <div className="grid gap-3">
                <Input
                  id="lastName"
                  placeholder="Last Name"
                  {...register("lastName")}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-3">
               <Controller name="dateOfBirth"
               control={control} render={({field}) => (
                <DatePicker value={field.value} onChange={field.onChange} placeholder="Date of Birth"/>
               )}/>
              </div>
              <div className="grid gap-3">
                <Controller
                  name="gender"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>

            <div className="grid gap-3">
              <Input id="email" placeholder="Email" {...register("email")} />
            </div>
            <div className="grid gap-3">
              <Input id="phone" placeholder="phone" {...register("phone")} />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Add Member</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
