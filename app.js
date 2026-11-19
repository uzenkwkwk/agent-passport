// Agent Passport frontend — static, no build step.
// Connects via window.ethereum (MetaMask / Binance Wallet).
// NEVER any QR-code login, NEVER auto-sign: every transaction is one the
// user confirms in their own wallet.

// ---- CONFIG: fill PASSPORT_ADDRESS after the BSC mainnet deploy. ----
const AGENT_ID_ADDRESS = "0x60b9262456de011f7d15a54cdd8c48baaa8b022f"; // SPACE ID Agent ID, BSC mainnet
const PASSPORT_ADDRESS = "0x27a8edd097d9ecbb99df3ab6032a9d2994c966d7"; // BSC mainnet, deployed 2026-11-19
const CHAIN_ID = 56; // BNB Chain mainnet

const AGENT_ID_ABI = ["function balanceOf(address owner) view returns (uint256)"];
const PASSPORT_ABI = [{"inputs":[{"internalType":"address","name":"agentIdContract","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"AlreadyCheckedInToday","type":"error"},{"inputs":[],"name":"AlreadyMinted","type":"error"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"address","name":"owner","type":"address"}],"name":"ERC721IncorrectOwner","type":"error"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ERC721InsufficientApproval","type":"error"},{"inputs":[{"internalType":"address","name":"approver","type":"address"}],"name":"ERC721InvalidApprover","type":"error"},{"inputs":[{"internalType":"address","name":"operator","type":"address"}],"name":"ERC721InvalidOperator","type":"error"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"ERC721InvalidOwner","type":"error"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"}],"name":"ERC721InvalidReceiver","type":"error"},{"inputs":[{"internalType":"address","name":"sender","type":"address"}],"name":"ERC721InvalidSender","type":"error"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ERC721NonexistentToken","type":"error"},{"inputs":[],"name":"NoPaymentAccepted","type":"error"},{"inputs":[],"name":"NotAgentIdHolder","type":"error"},{"inputs":[],"name":"NotTokenOwner","type":"error"},{"inputs":[],"name":"Soulbound","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":true,"internalType":"address","name":"holder","type":"address"},{"indexed":false,"internalType":"uint256","name":"day","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"streak","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"totalCheckIns","type":"uint256"}],"name":"CheckedIn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"holder","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Minted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"agentId","outputs":[{"internalType":"contract IAgentId","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"checkIn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"currentStreak","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"hasMinted","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"lastCheckInDay","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"mint","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"passportOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"bool","name":"","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"totalCheckIns","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"}];

const $ = (id) => document.getElementById(id);
let provider, signer, account, passport, agentId;

function setStatus(msg) {
  $("mintReason").textContent = msg;
}

async function refresh() {
  if (!account || PASSPORT_ADDRESS === "0x0000000000000000000000000000000000000000") {
    if (account) setStatus("Contract not deployed yet — check back after the launch.");
    return;
  }
  const idBalance = await agentId.balanceOf(account);
  const holdsId = idBalance > 0n;
  $("agentIdStatus").innerHTML = holdsId
    ? '<span class="ok">Yes — this wallet holds an Agent ID</span>'
    : '<span class="bad">No Agent ID found on this wallet</span>';

  const tokenId = await passport.passportOf(account);
  const minted = tokenId > 0n;

  if (!holdsId) {
    $("mintBtn").disabled = true;
    setStatus("You need an Agent ID (name.ai) in this wallet to mint. Claim one in the Binance App: Wallet > Agent ID.");
  } else if (minted) {
    $("mintBtn").disabled = true;
    setStatus("Already minted — one passport per Agent ID.");
  } else {
    $("mintBtn").disabled = false;
    setStatus("Eligible — mint is free, you only pay gas.");
  }

  if (minted) {
    $("passportCard").style.display = "block";
    $("tokenId").textContent = tokenId.toString();
    const [streak, total, lastDay] = await Promise.all([
      passport.currentStreak(tokenId),
      passport.totalCheckIns(tokenId),
      passport.lastCheckInDay(tokenId),
    ]);
    $("streak").textContent = streak.toString();
    $("totalCheckins").textContent = total.toString();
    $("lastDay").textContent = lastDay === 0n ? "never" : new Date(Number(lastDay) * 86400 * 1000).toISOString().slice(0, 10);
    const uri = await passport.tokenURI(tokenId);
    const json = JSON.parse(atob(uri.replace("data:application/json;base64,", "")));
    $("passportImg").src = json.image;

    const today = Math.floor(Date.now() / 1000 / 86400);
    if (Number(lastDay) >= today) {
      $("checkinBtn").disabled = true;
      $("checkinReason").textContent = "Already checked in today — come back tomorrow.";
    } else {
      $("checkinBtn").disabled = false;
      $("checkinReason").textContent = "Check in once per day to grow your streak.";
    }
  } else {
    $("passportCard").style.display = "none";
    $("checkinBtn").disabled = true;
    $("checkinReason").textContent = "Mint a passport first.";
  }
}

$("connectBtn").addEventListener("click", async () => {
  if (!window.ethereum) {
    alert("No wallet found. Install MetaMask or use Binance Wallet, then try again.");
    return;
  }
  provider = new ethers.BrowserProvider(window.ethereum);
  const accounts = await provider.send("eth_requestAccounts", []);
  account = accounts[0];
  signer = await provider.getSigner();
  const net = await provider.getNetwork();
  $("address").textContent = account;
  $("network").textContent = net.chainId === 56n ? "BNB Chain (56)" : "Chain " + net.chainId + " — please switch to BNB Chain (56)";
  agentId = new ethers.Contract(AGENT_ID_ADDRESS, AGENT_ID_ABI, provider);
  if (PASSPORT_ADDRESS !== "0x0000000000000000000000000000000000000000") {
    passport = new ethers.Contract(PASSPORT_ADDRESS, PASSPORT_ABI, signer);
  }
  $("contractAddr").textContent = PASSPORT_ADDRESS;
  await refresh();
});

$("mintBtn").addEventListener("click", async () => {
  try {
    $("mintBtn").disabled = true;
    setStatus("Confirm the mint in your wallet (free — gas only)...");
    const tx = await passport.mint(); // value 0 by design
    setStatus("Mint sent, waiting for confirmation...");
    await tx.wait();
    setStatus("Minted! Your passport is below.");
    await refresh();
  } catch (e) {
    setStatus("Mint failed or cancelled: " + (e.reason || e.message || e));
    $("mintBtn").disabled = false;
  }
});

$("checkinBtn").addEventListener("click", async () => {
  try {
    $("checkinBtn").disabled = true;
    $("checkinReason").textContent = "Confirm the check-in in your wallet...";
    const tokenId = await passport.passportOf(account);
    const tx = await passport.checkIn(tokenId);
    await tx.wait();
    await refresh();
  } catch (e) {
    $("checkinReason").textContent = "Check-in failed or cancelled: " + (e.reason || e.message || e);
    $("checkinBtn").disabled = false;
  }
});

$("contractAddr").textContent = PASSPORT_ADDRESS;
if (window.ethereum) {
  window.ethereum.on("accountsChanged", () => window.location.reload());
}
