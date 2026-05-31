import { z } from "zod";
import { exec } from "node:child_process";
import { spawn } from "node:child_process";

const FactSchema = z.object({
    data: z.array(
        z.object({
            attributes: z.object({
                body: z.string().min(1)
            })
        })
    )
});

const PicSchema = z.object({
    message: z.string()
})

const factUrl: string = "https://dogapi.dog/api/v2/facts";
const picUrl: string = "https://dog.ceo/api/breeds/image/random";

async function getDogFact(url: string): Promise<string> {
    const response: Response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: unknown = await response.json();
    const fact = FactSchema.safeParse(data);
    if (!fact.success) {
        throw new Error("Invalid data format");
    }
    return fact.data.data[0]?.attributes.body || "No fact available";
}

async function getDogPicture(url: string): Promise<string> {
    const response: Response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: unknown = await response.json();
    const pic = PicSchema.safeParse(data);
    if (!pic.success) {
        throw new Error("Invalid data format");
    }
    return pic.data.message;
}

const fact = await getDogFact(factUrl);
console.log(fact);
console.log("\n");

function hasCommand(cmd: string): Promise<boolean> {
    return new Promise((resolve) => {
        exec(`command -v ${cmd}`, (error) => {
            resolve(!error);
        });
    });
}

async function showImage(url: string): Promise<void> {
    const installed = await hasCommand("chafa");

    if (!installed) {
        throw new Error(
            "chafa is required. Install it with: sudo apt install chafa"
        );
    }

    const curl = spawn("curl", ["-L", url]);
    const chafa = spawn("chafa");

    curl.stdout.pipe(chafa.stdin);
    chafa.stdout.pipe(process.stdout);
}

const pic = await getDogPicture(picUrl);
showImage(pic);